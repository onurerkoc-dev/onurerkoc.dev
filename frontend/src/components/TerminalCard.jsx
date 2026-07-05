import BackendStatus from './BackendStatus'

function TerminalCard() {
  return (
    <aside className="terminalCard" aria-label="system overview">
      <div className="systemPanelHeader">
        <span>system ledger</span>
        <span>v0.4.0</span>
      </div>

      <div className="systemRows">
        <div className="systemRow">
          <span>frontend</span>
          <strong>React + Vite</strong>
        </div>

        <div className="systemRow">
          <span>backend</span>
          <strong>Spring Boot</strong>
        </div>

        <div className="systemRow">
          <span>api</span>
          <strong>/health · /projects</strong>
        </div>

        <div className="systemRow">
          <span>infra</span>
          <strong>DigitalOcean / FRA1</strong>
        </div>

        <div className="systemRow">
          <span>mode</span>
          <strong>build → document → deploy</strong>
        </div>
      </div>

      <BackendStatus />
    </aside>
  )
}

export default TerminalCard