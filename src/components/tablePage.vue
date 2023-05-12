<template>
    <div class="options-table">
        <table>
            <thead class="table-header">
                <tr>
                    <th v-for="header in headers" :key="header">{{ header }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="row in rows" :key="row.id">
                    <td v-for="column in columns" :key="column">{{ row[column]}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'tablePage',
    props: {
        headers: {
            type: Array,
            required: true
        },
        rows: { 
            type: Array,
            required: true
        },
        columns: { 
            type: Array,
            required: true
        }
    }
}
</script>

<style>
  .options-table {
    display: flex;
    flex-direction: column;
  }

  table {
    border-radius: 10px;
    margin: 10px;
    /* margin: 10px; */
    border-collapse: collapse;
    box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
    font-size: 1.2em;
    /* overflow-y: auto; */
    cursor: pointer;
  }

  thead { 
    background-color: #31446e;
    color: #fff
  }

  th, td {
    padding: 10px;
  }

  th:first-child {
    border-top-left-radius: 10px;
    /* border-top-right-radius: 5px; */
  }

  th:last-child {
    border-top-right-radius: 10px;
  }

  td {
    background-color: #fff;
    transition: .2s;
  }

  tr:hover td {
    background-color: #d3e8ff;
    transition: .2s;
  }

  tr:last-child td:last-of-type {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }
  
  tr:last-child td:first-of-type {
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }


</style>