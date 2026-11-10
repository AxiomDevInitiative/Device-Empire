export function hireEmployee(state, employee) {
  state.employees.push({ ...employee, hiredAt: Date.now() });
  return state.employees.at(-1);
}
