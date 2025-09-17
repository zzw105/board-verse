import { RouterProvider } from "react-router-dom";
import router from "./router";
import { Dropdown } from "antd";
import { useContextMenuStore } from "./store/useContextMenuStore";

const App = () => {
  const { menuPos, menuItemList, closeMenu } = useContextMenuStore();

  return (
    <>
      <div className="app">
        <RouterProvider router={router} />
        {menuPos && (
          <Dropdown
            menu={{ items: menuItemList }}
            open
            trigger={["contextMenu"]}
            onOpenChange={(open) => !open && closeMenu()}
          >
            <div
              style={{
                position: "absolute",
                top: menuPos.y,
                left: menuPos.x,
                width: 0,
                height: 0,
              }}
            />
          </Dropdown>
        )}
      </div>
    </>
  );
};

export default App;
