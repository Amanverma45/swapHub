const os = require("os");

const getClientUrl = (req) => {
    let origin = req.headers.origin || process.env.CLIENT_URL || "https://swaphub45.netlify.app";

    // If the origin contains localhost or 127.0.0.1, resolve the server's local network IP
    if (origin.includes("localhost") || origin.includes("127.0.0.1")) {
        const interfaces = os.networkInterfaces();
        let localIp = "";
        for (const devName in interfaces) {
            const iface = interfaces[devName];
            for (let i = 0; i < iface.length; i++) {
                const alias = iface[i];
                if (alias.family === "IPv4" && !alias.internal) {
                    localIp = alias.address;
                    break;
                }
            }
            if (localIp) break;
        }

        if (localIp) {
            origin = origin.replace("localhost", localIp).replace("127.0.0.1", localIp);
        }
    }
    return origin;
};

module.exports = getClientUrl;
