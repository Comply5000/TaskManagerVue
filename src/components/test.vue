<template>
    <div class="container mx-auto mt-8">
      <table class="border-collapse w-full">
        <thead>
          <tr>
            <th class="border border-gray-500 px-4 py-2">Kolumna 1</th>
            <th class="border border-gray-500 px-4 py-2">Kolumna 2</th>
            <th class="border border-gray-500 px-4 py-2">Kolumna 3</th>
          </tr>
        </thead>
        <tbody>
          <!-- Przykładowe dane tabeli -->
          <tr v-for="(row, index) in tableData" :key="index">
            <td class="border border-gray-500 px-4 py-2">{{ row.column1 }}</td>
            <td class="border border-gray-500 px-4 py-2">{{ row.column2 }}</td>
            <td class="border border-gray-500 px-4 py-2">{{ row.column3 }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        // Przykładowe dane tabeli
        tableData: [
          { column1: "Wartość 1", column2: "Wartość 2", column3: "Wartość 3" },
          { column1: "Wartość 4", column2: "Wartość 5", column3: "Wartość 6" },
          { column1: "Wartość 7", column2: "Wartość 8", column3: "Wartość 9" },
        ],
      };
    },
  };
  </script>
  
  <style>
  /* Styl tabeli */
  table {
    background-color: #f3f4f6;
  }
  
  th,
  td {
    text-align: left;
    padding: 0.5rem;
  }
  
  th {
    background-color: #e5e7eb;
    font-weight: bold;
    text-transform: uppercase;
  }
  
  /* Wyśrodkowanie tabeli wewnątrz kontenera */
  .container {
    display: flex;
    justify-content: center;
  }
  </style>
  