// // "use client"
// // import React, { useState, useEffect } from 'react'

// // const Clock = () => {
// //   const [time, setTime] = useState(new Date());
// //   const [running, setRunning] = useState(true);

// //   useEffect(() => {
// //     if (!running) return;

// //     const interval = setInterval(() => {
// //       setTime(new Date());
// //     }, 1000);

// //     // 清理逻辑
// //     return () => clearInterval(interval);
// //   }, [running]); // 当 running 状态变化时，重新设置定时器

// //   return (
// //     <div className="p-4">
// //       <h1 className="text-2xl mb-4">当前时间：</h1>
// //       <p className="text-xl font-mono">{time.toLocaleTimeString()}</p>
// //       <button
// //         onClick={() => setRunning(prev => !prev)}
// //         className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
// //       >
// //         {running ? '暂停' : '恢复'}
// //       </button>
// //     </div>
// //   );
// // };

// // export default Clock;

// "use client"
// import React from 'react'
// import { useState, useEffect } from "react";

// const Clock = () => {
//   const[time, setTime] = useState(new Date());
//   const[running, setRunning] = useState(true);
  
//   useEffect(() => {
//     if(!running) return;
//     const interval = setInterval(() => {
//         setTime(new Date());
//     }, 1000);
//     return () => clearInterval(interval);
//   }, [running])

//   return (
//     <div>
//         <p>{time.toLocaleString()}</p>
//         <button onClick={() => setRunning(prev => !prev)}>
//             {running ? "pause" : "start"}
//         </button>
//     </div>
//   )
// }

// export default Clock

"use client"

import React from 'react'
import { useState, useEffect } from 'react'

const Clock = () => {
  const[time, setTime] = useState(new Date());
  const[running, setRunning] = useState(true);
  
  useEffect(() => {
    if(!running) return;
    const interval = setInterval(() => {
      setTime(new Date());
    },1000);

    return () => clearInterval(interval);
  }, [running]);
  
  return (
    <div>
      <p>{time.toLocaleString()}</p>
      <button onClick={() => setRunning(prev => !prev)}>
        {running ? "pause" : "start"}
      </button>
    </div>
  )
}

export default Clock