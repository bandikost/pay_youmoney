import axios from "axios"


export default function PayButton() {

    const handleClick = async () => {
        try {
            const response = await axios.post("http://localhost:5000/api/yookassa/create-payment", {item: 5000})
            const {url} = response.data
            window.location.assign(url)
        }
        catch(error) {
            console.error("Ошибка при создании платежа:", error);
            alert("Не удалось создать платеж");
        }
    }
    

    return (
        <button onClick={handleClick}>Оплатить</button>
    )
}