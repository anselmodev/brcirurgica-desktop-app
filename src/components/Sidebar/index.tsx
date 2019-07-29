import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { History } from "history";
import { TweenMax, Back } from "gsap/TweenMax";
import { Icon } from "rsuite";
import {
  SidebarContainer,
  OverlaySide,
  ContentSide,
  ButtonOpenClose,
  ItemMenu
} from "./styles";
import {
  sidebarAction,
  modalDialogAction,
  lockScreenAction,
  toggleSearchAction,
  toggleBudgetAction
} from "_core/redux/actions";
import logoIcon from "assets/images/logo_icon.png";
import { setLogout } from "_core/config/login.conf";
import { menuItems } from "./menuItems";

type Props = {
  history: History;
};

export const Sidebar = (props: Props) => {
  const { location, push } = props.history;
  const dispatch = useDispatch();
  const sidebarStore = useSelector((state: any) => state.sidebar.data);
  const userData = useSelector((state: any) => state.login.data);

  const sidebarHandler = () => {
    const sidebarEl = document.querySelector("#sidebar");
    if (!sidebarStore.open) {
      TweenMax.to(sidebarEl, 0.5, {
        x: -30,
        boxShadow: "20px 10px 59px -27px rgba(0, 0, 0, 0.9) ",
        ease: Back.easeOut.config(1.7)
      });
      dispatch(
        sidebarAction({
          open: true
        })
      );
    } else {
      TweenMax.to(sidebarEl, 0.5, {
        x: -260,
        boxShadow: "3px 1px 4px -3px rgba(0,0,0,1)",
        ease: Back.easeOut.config(1.7)
      });
      dispatch(
        sidebarAction({
          open: false
        })
      );
    }
  };

  return location.pathname === "/login" ? (
    <div />
  ) : (
    <Fragment>
      {sidebarStore.open && <OverlaySide onClick={() => sidebarHandler()} />}
      <SidebarContainer id="sidebar">
        <ButtonOpenClose onClick={() => sidebarHandler()}>
          {sidebarStore.open ? (
            <Icon icon="close" className="iconBtnSide" />
          ) : (
            <Icon icon="bars" className="iconBtnSide" />
          )}
        </ButtonOpenClose>
        <ContentSide>
          <p className="logoSide">
            {!userData.photo ? (
              <img
                src={logoIcon}
                alt=""
                title=""
                width="55"
                className="default-avatar"
              />
            ) : (
              <img
                src={userData.photo}
                alt=""
                title=""
                width="55"
                className="person-avatar"
              />
            )}
          </p>
          <ul className="content-items">
            {menuItems.map((item: any) => {
              return (
                <ItemMenu
                  key={item.id}
                  upercase={item.upercase}
                  activeMenu={
                    `${location.pathname}${location.search}` === item.url
                      ? true
                      : false
                  }
                  disabledItem={
                    item.disabledItem ||
                    `${location.pathname}${location.search}` === item.url
                      ? true
                      : false
                  }
                  typeItem={item.type}
                  onClick={() => {
                    item.url && item.goToUrl(push(item.url));

                    /* Action Lock Screen */
                    item.id === "new-budget" &&
                      setTimeout(() => {
                        dispatch(
                          toggleBudgetAction({
                            open: true
                          })
                        );
                      }, 500);

                    /* Action Logout */
                    item.id === "app-logout" &&
                      dispatch(
                        modalDialogAction({
                          open: true,
                          type: "confirm",
                          title: "Sair do Sistema - Logout",
                          content: (
                            <p>
                              Ao confirmar, qualquer informação não salva será
                              perdida.
                            </p>
                          ),
                          buttons: [
                            {
                              appearance: "subtle",
                              label: "Cancelar"
                            },
                            {
                              appearance: "primary",
                              label: "Continuar",
                              action: () => setLogout(props.history)
                            }
                          ]
                        })
                      );

                    /* Action Lock Screen */
                    item.id === "app-lock" &&
                      dispatch(
                        lockScreenAction({
                          locked: true
                        })
                      );

                    /* Action Search */
                    item.id === "search-section" &&
                      dispatch(toggleSearchAction({ open: true }));
                    sidebarHandler();
                  }}
                >
                  {item.icon && (
                    <Icon
                      icon={item.icon}
                      className={`iconItemMenu ${item.classStyle}`}
                    />
                  )}
                  {`${location.pathname}${location.search}` === item.url &&
                  item.type !== "main" ? (
                    <Icon
                      icon="caret-right"
                      className={`iconItemMenu ${item.classStyle}`}
                    />
                  ) : (
                    ""
                  )}
                  {item.label} <small>{item.tipKey || ""}</small>
                </ItemMenu>
              );
            })}
          </ul>
        </ContentSide>
      </SidebarContainer>
    </Fragment>
  );
};
