import React, { useRef, useEffect } from "react";
import { History } from "history";
import { useDispatch, useSelector } from "react-redux";
import { TweenMax, Back } from "gsap/TweenMax";
import { Icon, Input, Button } from "rsuite";
import Mousetrap from "mousetrap";
import { LockScreenContainer } from "./styles";
import { keypressType } from "_core/helpers/keypressType";
import { lockScreenAction, modalDialogAction } from "_core/redux/actions";
import logoBR from "assets/images/logo_icon.png";
import { setLogout, getLogin } from "_core/config/login.conf";

type Props = {
  history: History;
};
export const LockScreen = (props: Props) => {
  const dispatch = useDispatch();
  const lockScreen = useSelector((state: any) => state.lockScreen.data);
  const inputAutoFocus = useRef<HTMLInputElement>();

  const showBoxHandler = (
    htmlElement: any,
    type: string,
    callback?: Function
  ) => {
    const element = document.querySelector(htmlElement);

    if (type === "show") {
      TweenMax.to(element, 0.5, {
        scale: 1,
        zIndex: 22,
        ease: Back.easeOut.config(1.7),
        onComplete: () => {
          setTimeout(() => {
            if (inputAutoFocus && inputAutoFocus.current) {
              inputAutoFocus.current.focus();
            }
          }, 500);
          return callback;
        }
      });
    } else if (type === "hide") {
      TweenMax.to(element, 0.2, {
        scale: 0,
        zIndex: 21,
        onComplete: callback
      });
    }
  };
  const unlockScreenHandler = () => {
    const getPassInput: any = document.querySelector("#password");

    if (!getPassInput.value) {
      dispatch(
        modalDialogAction({
          open: true,
          type: "warn",
          title: "Atenção",
          content: <p>Digite a senha para liberar o acesso!</p>,
          buttons: [
            {
              appearance: "primary",
              label: "Tentar Novamente",
              action: () =>
                setTimeout(() => {
                  if (inputAutoFocus && inputAutoFocus.current) {
                    inputAutoFocus.current.focus();
                  }
                }, 500)
            }
          ]
        })
      );
    } else {
      getLogin().then((result: any) => {
        if (result.dataLogin.password === getPassInput.value) {
          showBoxHandler("#boxLockScreen", "hide", () =>
            dispatch(
              lockScreenAction({
                locked: false
              })
            )
          );
        } else {
          dispatch(
            modalDialogAction({
              open: true,
              type: "err",
              title: "Erro de Senha",
              content: <p>A senha não confere com o usuário logado!</p>,
              buttons: [
                {
                  appearance: "primary",
                  label: "Tentar Novamente",
                  action: () =>
                    setTimeout(() => {
                      if (inputAutoFocus && inputAutoFocus.current) {
                        inputAutoFocus.current.focus();
                      }
                    }, 500)
                }
              ]
            })
          );
        }
      });
    }
  };

  Mousetrap.bind("ctrl+l", function() {
      dispatch(
        lockScreenAction({
          locked: true
        })
      );
  });

  useEffect(() => {
    if (lockScreen.locked) {
      showBoxHandler("#boxLockScreen", "show");
    }
  }, [lockScreen.locked]);

  return (
    lockScreen.locked && (
      <LockScreenContainer>
        <div className="overlay" />

        {/* BOX LOCK SCREEN */}
        <div className="lock-box" id="boxLockScreen">
          <img src={logoBR} alt="" className="logo-box" />
          <h3 className="box-title">
            <p>
              <Icon icon="lock" /> Systema Bloqueado
            </p>
          </h3>
          <p className="box-input">
            <Input
              inputRef={inputAutoFocus}
              size="md"
              type="password"
              placeholder="Digite sua Senha ..."
              id="password"
              onKeyUp={(event: any) => {
                keypressType(event, [13, "Enter"], unlockScreenHandler);
              }}
            />
          </p>
          <p className="box-button">
            <Button
              block
              color="blue"
              onClick={() => {
                unlockScreenHandler();
              }}
            >
              <Icon icon="unlock" /> Liberar
            </Button>
          </p>

          <p className="box-link">
            <Button
              appearance="link"
              onClick={() => {
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
                        action: () => {
                          dispatch(
                            lockScreenAction({
                              locked: false
                            })
                          );
                          setLogout(props.history);
                        }
                      }
                    ]
                  })
                );
              }}
            >
              <Icon icon="exit" /> Logout - Sair
            </Button>
          </p>
        </div>
      </LockScreenContainer>
    )
  );
};
