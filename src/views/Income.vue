<template>
    <div>
        <h1 class="text-5xl text-center text-gray-800 mb-10">Income Tracker</h1>
        <div class="flex">
            <div class="flex-1 mr-8 max-w-lg">
                <h1 class="text-4xl text-center text-gray-800 mb-10">Add Income</h1>
                <input type="text" v-model="newIncome.name" placeholder="Name" class="input-field">
                <select v-model="newIncome.job" class="input-field" placeholder="Select a job">
                    <option value="" disabled>Select a job</option>
                    <option v-for="(option, index) in jobOptions" :key="index" :value="option">{{ option }}</option>
                </select>
                <input type="text" v-model="amountInput" placeholder="₱" class="input-field">
                <div class="text-center">
                    <button @click="addOrUpdateIncome" class="btn-primary">
                        <svg v-if="editingIndex === null" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-square-fill" viewBox="0 0 16 16">
                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0"/>
                        </svg>
                        <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                        </svg>
                        {{ editingIndex === null ? '' : '' }}
                    </button>
                </div>
            </div>
            <div class="flex-1 relative">
                <div class="income-table-container border border-black">
                    <div class="income-table-wrapper">
                        <table class="w-full">
                            <thead class="header-row">
                                <tr>
                                    <th class="border border-black px-4 py-2">ID</th>
                                    <th class="border border-black px-4 py-2">Name</th>
                                    <th class="border border-black px-4 py-2">Job</th>
                                    <th class="border border-black px-4 py-2">Amount</th>
                                    <th class="border border-black px-4 py-2">Type</th>
                                    <th class="border border-black px-4 py-2">Date & Time</th>
                                    <th class="border border-black px-4 py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(income, index) in incomes" :key="index">
                                    <td class="border border-black px-4 py-2">{{ income.id }}</td>
                                    <td class="border border-black px-4 py-2">{{ income.name }}</td>
                                    <td class="border border-black px-4 py-2">{{ income.job }}</td>
                                    <td class="border border-black px-4 py-2">₱{{ income.amount }}</td>
                                    <td class="border border-black px-4 py-2">{{ income.type }}</td>
                                    <td class="border border-black px-4 py-2">{{ income.dateTime }}</td>
                                    <td class="px-4 py-2 flex justify-center items-center">
                                        <button @click="editIncome(index)" class="btn-secondary">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                            </svg>
                                        </button>
                                        <button @click="confirmDelete(income.id)" class="btn-danger">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                                            </svg>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="total-incomes bottom-0">Total Incomes: {{ totalIncomes }}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { collection, query, orderBy, onSnapshot, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import db from '../firebase/config';

const incomes = ref([]);
const newIncome = ref({
    name: '',
    job: '', 
    amount: 0,
});

const amountInput = ref('');
const editingIndex = ref(null);
const jobOptions = ref(['Medical Assistant', 'Nursing Assistant', 'Project Manager', 'Librarian', 'Marketing Coordinator']); 

const fetchIncomes = async () => {
    const q = query(collection(db, 'expenses'), orderBy('dateTime', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
        incomes.value = snapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() }))
            .filter(income => income.type === 'income'); 
    });
};

import { onMounted } from 'vue';
onMounted(fetchIncomes);

const addOrUpdateIncome = async () => {
    if (!newIncome.value.name || !newIncome.value.job || !amountInput.value) {
        alert('Please fill up all the fields.');
        return;
    }

    if (!/^[a-zA-Z\s]*$/.test(newIncome.value.name)) {
        alert('Name should contain only letters.');
        return;
    }
    if (isNaN(parseFloat(amountInput.value))) {
        alert('Please enter a valid number for the amount.');
        return;
    }
    if (editingIndex.value === null) {
        await addIncome();
    } else {
        await updateIncome();
    }
};

const addIncome = async () => {
    const dateTime = new Date().toLocaleString();
    const income = { ...newIncome.value, amount: parseFloat(amountInput.value), dateTime, type: 'income' };
    try {
        const docRef = await addDoc(collection(db, 'expenses'), income);
        console.log('Income added with ID: ', docRef.id);
    } catch (error) {
        console.error('Error adding income: ', error);
    }
    newIncome.value = {
        name: '',
        job: '', 
        amount: 0,
    };
    amountInput.value = '';
};

const updateIncome = async () => {
    const incomeId = incomes.value[editingIndex.value].id;
    const income = { ...newIncome.value, amount: parseFloat(amountInput.value) };
    try {
        await updateDoc(doc(db, 'expenses', incomeId), income);
        console.log('Income updated with ID: ', incomeId);
    } catch (error) {
        console.error('Error updating income: ', error);
    }
    newIncome.value = {
        name: '',
        job: '', 
        amount: 0,
    };
    amountInput.value = '';
    editingIndex.value = null;
};

const deleteIncome = async (id) => {
    try {
        await deleteDoc(doc(db, 'expenses', id));
        console.log('Income deleted with ID: ', id);
    } catch (error) {
        console.error('Error deleting income: ', error);
    }
};

const confirmDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this income?')) {
        deleteIncome(id);
    }
};

const editIncome = (index) => {
    const income = incomes.value[index];
    newIncome.value = {
        name: income.name,
        job: income.job,
        amount: income.amount,
    };
    amountInput.value = income.amount;
    editingIndex.value = index;
};

const totalIncomes = computed(() => {
    return incomes.value.reduce((total, income) => total + parseFloat(income.amount), 0);
});
</script>
<style scoped>
.input-field {
    border: 2px solid #040505; 
    padding: 12px; 
    border-radius: 8px; 
    margin-bottom: 15px;
    margin-left: 80px;
    font-size: 18px; 
    transition: all 0.3s ease;
    background: linear-gradient(145deg, #dcdcdc, #f9f9f9);
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    transform: translateZ(0);
}

.input-field:focus {
    outline: none;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2), 0px 0px 0px 2px #e35050;
}


.container {
    background: linear-gradient(to bottom, rgb(236, 211, 187), pink, rgb(233, 220, 208));
}

.btn-primary {
    background-color: #6ac259; 
    color: white;
    padding: 14px 24px; 
    border: none;
    border-radius: 8px; 
    cursor: pointer;
    font-size: 18px; 
    transition: all 0.3s ease;
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.1); 
    transform: translateZ(0);
}

.btn-primary:hover {
    background-color: #56a348;
}

.btn-secondary {
    background-color: #007bff; 
    color: white;
    padding: 10px 20px; 
    border: none;
    border-radius: 8px; 
    cursor: pointer;
    font-size: 16px; 
    transition: all 0.3s ease;
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.1); 
    margin-right: 10px; 
    transform: translateZ(0);
}

.btn-secondary:hover {
    background-color: #000000; 
}

.btn-danger {
    background-color: #ff6347;
    color: white;
    padding: 10px 20px; 
    border: none;
    border-radius: 8px; 
    cursor: pointer;
    font-size: 16px; 
    transition: all 0.3s ease;
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.1);
    margin-left: 10px;
    transform: translateZ(0);
}

.btn-danger:hover {
    background-color: #cc4c38;
}

.income-table-container {
        position: relative;
        height: 400px; 
        overflow-y: auto; 
        border: 2px solid #000000;
        border-radius: 8px;
        background: linear-gradient(to bottom, rgb(236, 211, 187), pink, rgb(233, 220, 208));
        box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.1);
        transform: translateZ(0);
    }
.income-table-wrapper {
    position: relative;
    z-index: 1;
}

.header-row {
    position: sticky;
    top: 0;
    background-color: rgb(245, 207, 207);
    z-index: 2;
}

.total-incomes {
    position: fixed;
    margin-bottom: 250px;
    margin-left: 820px;
    padding: 10px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);
    background-image: linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%); 
}
</style>
