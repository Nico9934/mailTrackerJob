import { useEmail } from "../context/EmailContext";

const PreviewEmail = () => {

    const { recruiterMail, recruiterName, positionName, expectativeSalary, dollarSalary } = useEmail();


    return (
        <div className="bg-white shadow-lg rounded-lg p-6 w-full">
            <h3 className="text-xl font-bold mb-4 text-gray-700">Vista Previa</h3>
            <div className="bg-gray-50 p-4 rounded-lg border">
                <p className="text-gray-600">
                    <strong>Para:</strong> {recruiterMail || 'correo@ejemplo.com'}
                    <br />
                    <strong>Asunto:</strong> Postulación para el puesto de{' '}
                    {positionName || 'Nombre del puesto'}
                </p>
                <hr className="my-4 border-gray-300" />
                <div className="text-gray-600 space-y-4">
                    <p>
                        Hola {recruiterName || 'Nombre del reclutador'},
                    </p>
                    <p>
                        Espero que estés muy bien. Mi nombre es <strong>Nicolas Rolon</strong>, y quiero
                        postularme para el puesto de <strong>{positionName || '[Posición]'}</strong>.
                    </p>
                    <p>
                        Soy desarrollador Fullstack con más de dos años de experiencia creando proyectos
                        diversos, principalmente con el stack MERN, aunque también tengo experiencia con C#
                        y Python.
                    </p>
                    {expectativeSalary &&
                        <p>La expectativa salarial que espero para este puesto es de
                            {dollarSalary == 'dollar' ? ' U$S ' :
                                ' ARS$ '
                            }
                            {expectativeSalary}, sin embargo, tengo
                            ganas de trabajar con ustedes y podria escuchar ofertas al respecto</p>
                    }
                    <p>Te dejo mi currículum adjunto. Espero tu respuesta. Y en caso de que mi perfil no matchee con la oferta
                        que guarden el mismo para futuras oportunidades
                    </p>
                    <p>
                        Saludos,
                        <br />
                        <strong>Nicolas Rolon</strong>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default PreviewEmail