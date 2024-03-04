import React from "react";
import QRCode from "react-native-qrcode-svg";

const QRcode = () => {
    return (
        <QRCode
            size={500}
            value={`{
    "id": 15,
    "name": "Hudica",
    "size": "XL",
    "color": "crvena",
    "status": {
        "code": "IN_WASHING",
        "description": "Clothes are currently being washed"
    }
}`}
        />
    );
}

export default QRcode