import React, { useRef, useEffect, useState } from "react";
import { History } from "history";
import { Button, Input, Icon } from "rsuite";
import { TweenMax, Back } from "gsap/TweenMax";
import { DisplayLoginPage } from "./Login.styles";
import logoBR from "assets/images/logo_icon.png";
import  { keypressType } from '_core/helpers/keypressType';

/* Electron API */
const windowAppObj = window as any;
const { remote } = windowAppObj.require("electron");
const theWindowApp = remote.getCurrentWindow();

type Props = {
  history: History;
  checkLoginHandler: Function;
  setLoginHandler: Function;
}

const LoginPage = (props: Props) => {
  const { history, checkLoginHandler, setLoginHandler } = props;
  const [notIsLogged, setNotIsLogged] = useState(false);
  const inputAutoFocus = useRef<HTMLInputElement>();

  /* Box methods */
  const showBoxHandler = (toggle?: true | false, callback?: Function) => {
    const boxElement = document.querySelector('#loginBox');
    if (toggle) {
      TweenMax.to(boxElement, 0.5, {
        scale: 1,
        zIndex: 22,
        ease: Back.easeOut.config(1.7),
        onComplete: () => {
          setTimeout(() => {
            if(inputAutoFocus && inputAutoFocus.current) {
              inputAutoFocus.current.focus();
            }
          }, 500);
          return callback;
        }
      });
    } else {
      TweenMax.to(boxElement, 0.2, {
        scale: 0,
        zIndex: 21,
        onComplete: callback
      });
    }
  };
  const setLogin = async () => {
    const setLoginSystem = await setLoginHandler();
    if(setLoginSystem) {
      showBoxHandler(false, () => history.push("/home"));
    }
  };

  useEffect(() => {
    const intervalWindow = setInterval(() => {
      if (theWindowApp.isVisible()) {
        showBoxHandler(true);
        setTimeout(async () => {
          const checkLogin = await checkLoginHandler();

          if(checkLogin) {
            showBoxHandler(false, () => history.push("/home"));
          } else {
            setNotIsLogged(true);
          }
          clearInterval(intervalWindow);
        }, 500);
      }
    }, 800);
  }, [checkLoginHandler, history]);

  return (
    <DisplayLoginPage className="scroll-style">
      <div className="overlay" />
      {/* BOX LOGIN */}
      <div className="login-box" id="loginBox">
        <img src={logoBR} alt="" className="logo-box" />
        {notIsLogged ? (
          <div>
            <h3 className="box-title">
              <p>
                <Icon icon="key" /> Login Administrativo
              </p>
            </h3>
            <p className="box-input">
              <Input inputRef={inputAutoFocus} size="md" placeholder="Usuário ..." id="user"
                onKeyUp={(event: any) => {
                  keypressType(event, [13, "Enter"], setLogin);
                }}
              />
            </p>
            <p className="box-input">
              <Input size="md" type="password" placeholder="Senha ..." id="password"
                onKeyUp={(event: any) => {
                  keypressType(event, [13, "Enter"], setLogin);
                }}
              />
            </p>
            <p className="box-button">
              <Button block color="blue"
                onClick={() => {
                  setLogin();
                }}
              >
                <Icon icon="sign-in" /> Entrar
              </Button>
            </p>
          </div>
        ) : (
          <div>
            <h3 className="box-title">
              <p className="checking-user-title">
                <Icon icon="refresh" spin /> Verificando Acesso...
              </p>
            </h3>
          </div>
        )}
      </div>
    </DisplayLoginPage>
  );
};

export default React.memo(LoginPage);
