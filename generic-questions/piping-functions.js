const value = { salary: 10000 };

const getSalary = person => person.salary;
const addBonus = netSalary => netSalary + 1000;
const deductTax = grossSalary => grossSalary - 0.3 * grossSalary;

function pipe ( ...fns ) {

    return ( val ) => {
        return fns.reduce(( prevResult, currFn ) => currFn(prevResult), val);
    }
}

const result = pipe(
    getSalary, 
    addBonus, 
    deductTax
)(value);

console.log(result);