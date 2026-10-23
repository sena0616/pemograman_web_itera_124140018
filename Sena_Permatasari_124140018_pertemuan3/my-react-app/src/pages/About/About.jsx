
import React from 'react';
import Header from '../../components/Header/Header';
import { useTasks } from '../../context/TaskContext';
import './About.css';

function About() {
  const { stats } = useTasks();

  return (
    <div className="about">
      <Header
        title="Tentang Task Manager"
        description="Aplikasi Manajemen Tugas Praktikum Pemrograman Web"
      />

      <main className="container">
        <div className="about-content">
          <h2>Tentang Aplikasi</h2>
          <p>
            Aplikasi Task Manager ini dibangun menggunakan React modern
            dengan functional components, React Hooks, React Router,
            dan Context API.
          </p>

          <h3>Fitur Unggulan:</h3>
          <ul>
            <li>Manajemen tugas (tambah, tandai selesai, hapus)</li>
            <li>Penyimpanan data melalui localStorage</li>
            <li>Navigasi halaman menggunakan React Router</li>
            <li>Pengelolaan state global menggunakan Context API</li>
            <li>Statistik penyelesaian tugas</li>
          </ul>

          <h3>Statistik Tugas</h3>
          <p>
            Saat ini Anda memiliki total {stats.total} tugas
            yang tersimpan di sistem.
          </p>
        </div>
      </main>
    </div>
  );
}

export default About;
