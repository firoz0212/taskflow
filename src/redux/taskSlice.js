import { createSlice } from "@reduxjs/toolkit";

const savedTasks =
  JSON.parse(localStorage.getItem("tasks")) || [];

  const taskSlice = createSlice({
  name: "tasks",
  initialState: savedTasks,
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);

localStorage.setItem(
  "tasks",
  JSON.stringify(state)
);
    },

    deleteTask: (state, action) => {
      const updatedTasks = state.filter(
  task => task.id !== action.payload
);

localStorage.setItem(
  "tasks",
  JSON.stringify(updatedTasks)
);

return updatedTasks;

    },

    updateStatus: (state, action) => {
  const task = state.find(
    t => t.id === action.payload.id
  );

  if (task) {
    task.status = action.payload.status;

    localStorage.setItem(
      "tasks",
      JSON.stringify(state)
    );
    }
  },

editTask: (state, action) => {
  const task = state.find(
    t => t.id === action.payload.id
  );

  if (task) {
    task.title = action.payload.title;
    task.description = action.payload.description;
    task.priority = action.payload.priority;
    task.dueDate = action.payload.dueDate;
    task.status = action.payload.status;

    localStorage.setItem(
      "tasks",
      JSON.stringify(state)
    );
   
  }
}
}
});

export const {
  addTask,
  deleteTask,
  updateStatus,
  editTask
} = taskSlice.actions;

export default taskSlice.reducer;