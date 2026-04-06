'use client';

import { memo, useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

import { PARCHMENT_BASEMAP_URL } from '@/components/map/map-style';
import { removeMapLibreMapQuietly } from '@/lib/maplibre-quiet-remove';
import { pickI18n } from '@/lib/locale';
import type { AtlasLocale } from '@/core/types';
import {
  addDeepOriginsLayers,
  updateDeepOriginsLines,
  updateDeepOriginsSites,
  setDeepOriginsLayerVisibility,
} from '@/components/ancestry/deep-origins-map-layers';
import { DEEP_ORIGIN_SITES } from '@/data/atlas/deep-origins/sites';

export type DeepOriginsMapProps = {
  linesData: GeoJSON.FeatureCollection;
  sitesData: GeoJSON.FeatureCollection;
  showMigrations: boolean;
  showSites: boolean;
  showLabels: boolean;
  /** When set, map flies to this site */
  flyToSiteId: string | null;
  locale: AtlasLocale;
  onSiteSelect: (siteId: string | null) => void;
};

const EURO_VIEW: maplibregl.CameraOptions = {
  center: [15, 48],
  zoom: 3.35,
};

const DeepOriginsMap = memo(function DeepOriginsMap({
  linesData,
  sitesData,
  showMigrations,
  showSites,
  showLabels,
  flyToSiteId,
  locale,
  onSiteSelect,
}: DeepOriginsMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const popupRef = useRef<maplibregl.Popup | null>(null);
  const onSiteSelectRef = useRef(onSiteSelect);
  onSiteSelectRef.current = onSiteSelect;
  const localeRef = useRef(locale);
  localeRef.current = locale;
  const linesRef = useRef(linesData);
  linesRef.current = linesData;
  const sitesRef = useRef(sitesData);
  sitesRef.current = sitesData;
  const visRef = useRef({ migrations: showMigrations, sites: showSites, labels: showLabels });
  visRef.current = { migrations: showMigrations, sites: showSites, labels: showLabels };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return undefined;

    let disposed = false;

    const map = new maplibregl.Map({
      container: el,
      style: PARCHMENT_BASEMAP_URL,
      ...EURO_VIEW,
      minZoom: 2,
      maxZoom: 9,
      attributionControl: false,
    });
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'bottom-right');
    map.addControl(new maplibregl.AttributionControl({ compact: true }), 'bottom-right');
    mapRef.current = map;

    const popup = new maplibregl.Popup({ closeButton: true, maxWidth: '280px' });
    popupRef.current = popup;

    const onClick = (e: maplibregl.MapMouseEvent) => {
      const feats = map.queryRenderedFeatures(e.point, { layers: ['deep-origins-sites-circles', 'deep-origins-sites-selected'] });
      const f = feats[0];
      const sid = f && typeof f.properties?.id === 'string' ? f.properties.id : null;
      onSiteSelectRef.current(sid);
      if (!sid) {
        popup.remove();
        return;
      }
      const site = DEEP_ORIGIN_SITES.find((s) => s.id === sid);
      if (!site) return;
      const L = localeRef.current;
      const html = `
        <div style="font:13px/1.45 system-ui, sans-serif; color: #1a1816;">
          <div style="font-weight:600; margin-bottom:4px;">${site.name}</div>
          <div style="opacity:0.85; font-size:11px; margin-bottom:6px;">~${site.approxYearBP.toLocaleString()} ybp · ${pickI18n(site.country, L)}</div>
          <div style="font-size:12px;">${pickI18n(site.blurb, L)}</div>
        </div>`;
      popup.setLngLat(e.lngLat).setHTML(html).addTo(map);
    };

    map.on('click', onClick);

    const onLoad = () => {
      if (disposed) return;
      addDeepOriginsLayers(map);
      updateDeepOriginsLines(map, linesRef.current);
      updateDeepOriginsSites(map, sitesRef.current);
      setDeepOriginsLayerVisibility(map, visRef.current);
    };
    map.on('load', onLoad);

    return () => {
      disposed = true;
      map.off('load', onLoad);
      map.off('click', onClick);
      try {
        popup.remove();
      } catch {
        /* popup may already be detached */
      }
      removeMapLibreMapQuietly(map);
      mapRef.current = null;
      popupRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map?.isStyleLoaded()) return;
    updateDeepOriginsLines(map, linesData);
  }, [linesData]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map?.isStyleLoaded()) return;
    updateDeepOriginsSites(map, sitesData);
  }, [sitesData]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map?.isStyleLoaded()) return;
    setDeepOriginsLayerVisibility(map, { migrations: showMigrations, sites: showSites, labels: showLabels });
  }, [showMigrations, showSites, showLabels]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !flyToSiteId) return;
    const site = DEEP_ORIGIN_SITES.find((s) => s.id === flyToSiteId);
    if (!site) return;
    const target = {
      center: [site.lng, site.lat] as [number, number],
      zoom: 5.2,
      duration: 900,
    };
    const fly = () => {
      if (mapRef.current !== map) return;
      map.flyTo(target);
    };
    if (map.isStyleLoaded()) fly();
    else map.once('load', fly);
    return () => {
      map.off('load', fly);
    };
  }, [flyToSiteId]);

  return (
    <div
      ref={containerRef}
      className="h-full min-h-[280px] w-full overflow-hidden rounded-xl border border-chrome-border-strong/40 bg-chrome-fill/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] md:min-h-0 md:rounded-none md:border-0 md:bg-transparent md:shadow-none"
      role="presentation"
    />
  );
});

export default DeepOriginsMap;
