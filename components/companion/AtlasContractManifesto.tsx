import { atlasContract } from '@/data/atlas/methodology';

export default function AtlasContractManifesto() {
  return (
    <section
      className="companion-manifesto companion-print-break-inside-avoid my-10"
      aria-labelledby="companion-manifesto-heading"
    >
      <h2 id="companion-manifesto-heading" className="companion-manifesto__title">
        Atlas contract
      </h2>
      <p className="companion-manifesto__lede">
        Thirteen rules the Norman Atlas holds to—so you know what the map promises, and what it refuses to fake.
      </p>
      <div className="companion-manifesto__grid">
        {atlasContract.rules.map((rule, i) => (
          <div key={i} className="companion-manifesto__card">
            <span className="companion-manifesto__index">{String(i + 1).padStart(2, '0')}</span>
            <p className="companion-manifesto__rule">{rule}</p>
          </div>
        ))}
      </div>
      <div className="companion-manifesto__forbidden">
        <h3 className="companion-manifesto__forbidden-title">Forbidden claims</h3>
        <ul className="companion-manifesto__forbidden-list">
          {atlasContract.forbiddenClaims.map((claim, i) => (
            <li key={i}>{claim}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
