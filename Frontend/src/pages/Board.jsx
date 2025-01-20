import ListSendData from "../components/ListSendData"
import PreviewEmail from "../components/PreviewEmail"
import SendData from "../components/SendData"

const Board = () => {
    return (
        <div className="flex flex-col items-center w-full gap-6">
            {/* Contenedor superior para el formulario de envío y la previsualización */}
            <div className="flex w-full flex-wrap lg:flex-nowrap gap-6">
                <SendData />
                <PreviewEmail />
            </div>
            {/* Contenedor inferior para la lista de datos enviados */}
            <div className="flex w-full">
                <ListSendData />
            </div>
        </div>
    )
}

export default Board