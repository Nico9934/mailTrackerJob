import { useEmail } from "../context/EmailContext"

const ListSendData = () => {



    const { sendList } = useEmail();

    return (
        <div className="m-auto shadow-lg rounded-lg p-6 w-full bg-white">
            {/* Lista de correos */}

            <h3 className="text-xl font-bold mb-4 text-gray-700">
                Lista de correos para enviar
            </h3>
            {sendList.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-300 px-4 py-2 text-left">
                                    Para (Email)
                                </th>
                                <th className="border border-gray-300 px-4 py-2 text-left">
                                    Nombre
                                </th>
                                <th className="border border-gray-300 px-4 py-2 text-left">
                                    Puesto
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {sendList.map((entry, index) => (
                                <tr
                                    key={index}
                                    className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"
                                        }`}
                                >
                                    <td className="border border-gray-300 px-4 py-2">
                                        {entry.recruiterMail}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {entry.recruiterName}
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        {entry.positionName}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-gray-500">No hay correos en la lista.</p>
            )}
        </div>

    );
}

export default ListSendData