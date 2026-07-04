function TerminalCard() {
  return (
    <aside className="terminalCard" aria-label="project status terminal">
      <div className="terminalTopbar">
        <span />
        <span />
        <span />
      </div>

      <div className="terminalBody">
        <p>
          <span className="prompt">onur@server</span>:~$ systemctl status portfolio
        </p>
        <p className="terminalGreen">● active — learning in progress</p>
        <p>
          <span className="prompt">stack</span> react + spring_boot + postgres + docker
        </p>
        <p>
          <span className="prompt">region</span> digitalocean / fra1
        </p>
        <p>
          <span className="prompt">mode</span> build → document → deploy → improve
        </p>
      </div>
    </aside>
  )
}

export default TerminalCard