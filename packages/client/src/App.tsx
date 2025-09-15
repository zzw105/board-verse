import { RouterProvider } from "react-router-dom";
import router from "./router";
import { Dropdown } from "antd";
import { useContextMenuStore } from "./store/useContextMenuStore";

const App = () => {
  const menuPos = useContextMenuStore((s) => s.menuPos);
  const menuItemList = useContextMenuStore((s) => s.menuItemList);
  const closeMenu = useContextMenuStore((s) => s.closeMenu);
  // const { menuPos, menuItemList, closeMenu } = useContextMenuStore((s) => ({
  //   menuPos: s.menuPos,
  //   menuItemList: s.menuItemList,
  //   closeMenu: s.closeMenu,
  // }));
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
