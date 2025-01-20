import { useEmail } from "../context/EmailContext";

const SendData = () => {


    const { setRecruiterName, recruiterName, recruiterMail,
        setRecruiterMail, positionName, setPositionName,
        handleAddToList, handleSendAll, expectativeSalary, setExpectativeSalary, dollarSalary,
        setDollarSalary } = useEmail();

    return (
        <div className="mx-auto shadow-lg rounded-lg p-6 w-full max-w-md h-auto bg-white">
            <h2 className="text-2xl font-bold mb-4 text-gray-700" > Mail Tracker Job</h2 >
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Nombre del reclutador"
                        value={recruiterName}
                        onChange={(e) => setRecruiterName(e.target.value)}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Email del reclutador"
                        value={recruiterMail}
                        onChange={(e) => setRecruiterMail(e.target.value)}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Puesto de trabajo"
                        value={positionName}
                        onChange={(e) => setPositionName(e.target.value)}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Expectativa salarial"
                        value={expectativeSalary}
                        onChange={(e) => setExpectativeSalary(e.target.value)}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                {expectativeSalary &&
                    <div className="mb-4 flex items-center justify-between">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="salaryType"
                                value="dollar"
                                checked={dollarSalary === "dollar"}
                                onChange={() => setDollarSalary("dollar")}
                                className="mr-2"
                            />
                            Sueldo en dólares
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="salaryType"
                                value="local"
                                checked={dollarSalary === "local"}
                                onChange={() => setDollarSalary("local")}
                                className="mr-2"
                            />
                            Sueldo en moneda local
                        </label>
                    </div>
                }

            </form>
            <div className="flex justify-between gap-4 mt-4">
                <button
                    onClick={handleAddToList}
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                    Agregar a lista
                </button>
                <button
                    onClick={handleSendAll}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                >
                    Enviar todos
                </button>
            </div>
        </div >
    )
}

export default SendData