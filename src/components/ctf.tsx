"use client";

import React from 'react'

const Ctfa = () => {
  return (
    <div>
      <h1>Test ctf</h1>
      <iframe src="https://lamenote-web.chal.irisc.tf/search" width={200} height={200} sandbox="allow-forms allow-same-origin">
        <script>
          alert(1);
        </script>
      </iframe>
    </div>
  )
}

export default Ctfa;
