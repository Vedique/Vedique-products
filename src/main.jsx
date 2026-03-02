import { HashRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <ConfigProvider theme={{ token: { colorPrimary: "#C6A969", colorBgContainer: "#FFFFFF", borderRadius: 0 } }}>
        <App />
      </ConfigProvider>
    </HashRouter>
  </React.StrictMode>
);