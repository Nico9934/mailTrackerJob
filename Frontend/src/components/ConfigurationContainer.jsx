import { useEmail } from "../context/EmailContext";

const ConfigurationContainer = () => {
    const { dollarSalary, setDollarSalary, expectativeSalary, setExpectativeSalary, saveEmail } = useEmail();

    return (
        <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Configuración del Email</h2>

            <label className="flex items-center space-x-2">
                <input type="checkbox" checked={dollarSalary} onChange={() => setDollarSalary(!dollarSalary)} />
                <span>Mostrar sueldo en dólares</span>
            </label>

            <input
                type="text"
                placeholder="Expectativa salarial"
                value={expectativeSalary}
                onChange={(e) => setExpectativeSalary(e.target.value)}
                className="border p-2 w-full mt-2"
            />

            <button
                onClick={saveEmail}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4"
            >
                Guardar Email
            </button>
        </div>
    );
};

export default ConfigurationContainer;