<script setup>
import { ref, computed, onMounted } from 'vue';
import { collection, query, where, getDocs } from 'firebase/firestore';
import db from '../firebase/config';

const totalExpenses = ref(0);
const totalIncomes = ref(0);

const fetchTotalExpenses = async () => {
  const q = query(collection(db, 'expenses'), where('type', '==', 'expense'));
  const querySnapshot = await getDocs(q);
  let total = 0;
  querySnapshot.forEach(doc => {
    total += parseFloat(doc.data().amount);
  });
  totalExpenses.value = total;
};

const fetchTotalIncomes = async () => {
  const q = query(collection(db, 'expenses'), where('type', '==', 'income'));
  const querySnapshot = await getDocs(q);
  let total = 0;
  querySnapshot.forEach(doc => {
    total += parseFloat(doc.data().amount);
  });
  totalIncomes.value = total;
};

onMounted(() => {
  fetchTotalExpenses();
  fetchTotalIncomes();
});

const balance = computed(() => {
  return totalIncomes.value - totalExpenses.value;
});
</script>
<template>
  <div class="flex justify-center items-start bg-gray-20">
    <div class="container mx-auto p-8 bg-white rounded-lg shadow-2xl border border-gray-300 custom-container">
      <div class="summary-container">
        <h1 class="text-5xl text-center text-gray-800 mb-10">Summary</h1>
        <div class="summary-item bg-gray-200 rounded-lg p-6">
          <h2 class="text-3xl text-center text-gray-800 mb-4">Total Expenses</h2>
          <p class="text-xl text-center text-red-500 font-bold">{{ totalExpenses }}</p>
        </div>
        <div class="summary-item bg-gray-200 rounded-lg p-6">
          <h2 class="text-3xl text-center text-gray-800 mb-4">Total Incomes</h2>
          <p class="text-xl text-center text-green-500 font-bold">{{ totalIncomes }}</p>
        </div>
        <div class="summary-item bg-gray-200 rounded-lg p-6">
          <h2 class="text-3xl text-center text-gray-800 mb-4">Balance</h2>
          <p class="text-xl text-center font-bold" :class="{ 'text-red-500': balance < 0, 'text-green-500': balance >= 0 }">{{ balance }}</p>
        </div>
      </div>
      <div class="images-container flex justify-between"> <!-- Container for images -->
        <img src="https://img.freepik.com/premium-vector/cute-boy-cartoon-character-with-gesture-money-expense_81698-1590.jpg" alt="Provided Image" class="custom-image">  
        <img src="https://i.pinimg.com/736x/e4/c2/8c/e4c28c690a228a24a765b891c700d018.jpg" alt="Provided Image" class="custom-image">  
      </div>
    </div>
  </div>
</template>


<style scoped>
.images-container {
  display: flex;
  justify-content: space-between; 
}

.custom-image {
  width: 30%; 
  height: auto;

}


.summary-container {
  width: 100%;
  max-width: 600px; 
  margin: auto; 
  display: flex;
  flex-direction: column;
  align-items: center; 
}

.summary-item {
  width: 100%; 
  max-width: 300px; 
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease; 
}

.summary-item:hover {
  transform: translateY(-5px); 
}

.custom-container {
  width: 100%; 
  max-width: 1200px; 
}
</style>
