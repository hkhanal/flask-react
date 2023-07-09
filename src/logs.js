import React, { useEffect, useState } from 'react';

function LogOutput() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource('/stream');

    eventSource.addEventListener('message', event => {
      const newLog = event.data;
      setLogs(prevLogs => [...prevLogs, newLog]);  // Append new log to existing logs
    });

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div>
      {logs.map((log, index) => (
        <p key={index}>{log}</p>
      ))}
    </div>
  );
}

export default LogOutput;