
import { Item } from "@prisma/client";
import { useEffect, useState } from "react";

const CartInfo = () => {

    const [fetchingCart, setFetchingCart] = useState(true);
    const [cart, setCart] = useState({
        data: [
            {
                id: "",
                Item_id: {} as Item,
                Quantity: 0
            }
        ]
    });

    useEffect(() => {
        const id = localStorage.getItem("id");
        if(id != null){
            fetch("api/Cart/" + id)
            .then(data => {
                return data.json();
            }).then(data => {
                if (data.error != null) {
                    localStorage.removeItem("id");
                }
                setCart(data)
            });
        }
        setTimeout(() => {
            setFetchingCart(false)
        }, 600)
    }, []);

    if (fetchingCart) {
        return <div>
            fetching
        </div>
    } else {
        return <div>
            <table>
                <tr>
                    <th>Item Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Modify</th>
                </tr>
                {cart.data.map(ele => {
                    return <tr key={ele.id}>
                        <td>{ele.Item_id.Name}</td>
                        <td>{ele.Item_id.Price}</td>
                        <td>{ele.Quantity}</td>
                        <td>{ele.Item_id.Price * ele.Quantity}</td>
                        <td><button>-</button>{ele.Quantity}<button>+</button></td>
                    </tr>
                })}
            </table>
            <button><a href="/buy">buy</a></button>
        </div>
    }
}

export default CartInfo;