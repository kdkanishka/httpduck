module.exports = {
    getHostName: function () {
        if (typeof (process.env.APP_BASE_URL) != "undefined") {
            return process.env.APP_BASE_URL;
        } else {
            return "localhost:8080";
        }
    },

    getTempDir: function () {
        if (typeof (process.env.APP_TEMP_DIR) != "undefined") {
            return process.env.APP_TEMP_DIR;
        } else {
            return "~/tmp";
        }
    },

    getServerPort: function () {
        return process.env.ALWAYSDATA_HTTPD_PORT || process.env.PORT || 8080;
    },

    getServerHost: function () {
        return process.env.ALWAYSDATA_HTTPD_IP || "0.0.0.0";
    }

}