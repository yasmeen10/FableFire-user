import React, { useState } from "react";
import styles from "./Home.module.css";
import { useEffect } from "react";

export default function Home() {
  return (
    <div>
      <p className={styles.hamada}>hi</p>
      <p className={styles.green}>green</p>
      <p className="text-red-400">hi</p>
    </div>
  );
}
