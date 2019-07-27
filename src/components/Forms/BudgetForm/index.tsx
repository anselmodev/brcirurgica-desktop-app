import React, { useEffect, useState } from "react";
import { TweenMax, Back } from "gsap/TweenMax";
import { useDispatch, useSelector } from "react-redux";
import { IconButton, Icon, Loader, Button } from "rsuite";
import Mousetrap from "mousetrap";
import {
  BudgetFormContainer,
  BudgetFormBody,
  HeaderForm,
  ContentForm,
  FooterForm,
  BtnCloseForm,
  LeftBlockInfo,
  RightBlockInfo,
  WaterIcon,
  Preloader
} from "./styles";
import {
  resultBudgetAction,
  toggleBudgetAction
} from "../../../_core/redux/actions";
import { ToolTip } from "../../ToolTip";

export const BudgetForm = () => {
  const dispatch = useDispatch();
  const [stateLoader, setStateLoader] = useState(false);
  const { locked } = useSelector((state: any) => state.lockScreen.data);
  const { open, number, modified, result } = useSelector(
    (state: any) => state.budget.data
  );

  const toggleAnimationForm = (open: boolean, callback?: Function) => {
    const formElement = document.querySelector("#budgetForm");
    if (open) {
      TweenMax.to(formElement, 0.3, {
        bottom: 0,
        onComplete: () => {
          if (number) {
            setStateLoader(true);
          }
        }
      });
    } else {
      TweenMax.to(formElement, 0.3, {
        bottom: "-100%",
        onComplete: () => {
          callback && callback();
          dispatch(
            toggleBudgetAction({
              open: false
            })
          );
          setStateLoader(false);
        }
      });
    }
  };

  const budgetCloseHandler = () => {
    toggleAnimationForm(false);
  };
  const budgetSaveHandler = (confirmExit?: boolean) => {
    setStateLoader(true);
    if(confirmExit) {
      console.log("Confirmar, Salvar alterações e sair");
    } else {
      console.log("Salvar alterações");
    }
  };
  const budgetNewFormHandler = () => {
    console.log("Novo orçamento");
  };
  const budgetDeleteHandler = () => {
    console.log("Excluir orçamento");
  };
  const budgetPdfHandler = () => {
    console.log("Gerar PDF do orçamento");
  };

  Mousetrap.bind("ctrl+n", function() {
    // verificar se ORÇAMENTO aberto foi alterado, antes de
    // resetar o formulario
    if (!locked) {
      dispatch(
        toggleBudgetAction({
          open: true
        })
      );
    }
  });
  Mousetrap.bind("ctrl+s", function() {
    if (!locked && open && modified) {
      budgetSaveHandler();
    }
  });
  Mousetrap.bind("ctrl+shift+s", function() {
    if (!locked && open && modified) {
      budgetSaveHandler();
    }
  });

  useEffect(() => {
    if (open) {
      toggleAnimationForm(open);
    }
  }, [open, number]);

  return (
    open && (
      <BudgetFormContainer>
        <BudgetFormBody id="budgetForm">
          {stateLoader && (
            <Preloader>
              <Loader size="md" className="loader-budget" />
            </Preloader>
          )}

          {/* HEADER */}
          <HeaderForm>
            <WaterIcon>
              <Icon icon="file" />
            </WaterIcon>
            <BtnCloseForm onClick={() => budgetCloseHandler()}>
              <IconButton icon={<Icon icon="close" />} circle size="xs" />
            </BtnCloseForm>

            <LeftBlockInfo>
              <p className="customer-name">Nome do cliente aqui ...</p>
              <p className="customer-contact">
                Contato: <b>Nome do Contato</b>
              </p>
              <p className="customer-contact">
                E-mail: <b>email@email.com</b>
              </p>
              <p className="customer-contact">
                Telefones: <b>11 - 0000-0000 / 11 - 9999-99999</b>
              </p>
            </LeftBlockInfo>

            <RightBlockInfo>
              <p className="os-number">
                OS Número: <b>{number || "-----"}</b>
              </p>
              <p className="os-date">
                Criado em: <b>00/00/0000</b>
              </p>
              <p className="os-status">
                Status: <b>Rascunho</b>
              </p>
              <p className="os-value">
                Total Bruto: <b>R$ 10.000,00</b>
              </p>
            </RightBlockInfo>
          </HeaderForm>

          {/* CONTENT */}
          <ContentForm className="scroll-style">
            <p>[ Content ]</p>
          </ContentForm>
          
          {/* FOOTER */}
          <FooterForm>
            <div className="block-left-footer">
              <Button
                id="pdfBudget"
                color="cyan"
                appearance="subtle"
                disabled={number ? false : true}
                onClick={() => {
                  budgetPdfHandler();
                }}
              >
                <Icon icon="external-link" /> Exporta em PDF
              </Button>
              <Button
                id="deleteBudget"
                color="red"
                appearance="subtle"
                disabled={number ? false : true}
                onClick={() => {
                  budgetDeleteHandler();
                }}
              >
                <Icon icon="trash" /> Excluir
              </Button>
              <ToolTip placement="top" content="Novo: ( CTRL+N )">
                <Button
                  id="newBudget"
                  color="cyan"
                  appearance="subtle"
                  disabled={modified || number ? false : true}
                  onClick={() => budgetNewFormHandler()}
                >
                  <Icon icon="pencil" /> Novo
                </Button>
              </ToolTip>
            </div>

            <div className="block-right-footer">
              <ToolTip
                placement="top"
                content="Salvar e Sair: ( CTRL+SHIFT+S )"
              >
                <Button
                  id="saveExitBudget"
                  color="green"
                  appearance="subtle"
                  onClick={() => budgetSaveHandler(true)}
                  disabled={!modified ? true : false}
                >
                  <Icon icon="sign-out" /> Salvar e Sair
                </Button>
              </ToolTip>
              <ToolTip placement="top" content="Salvar: ( CTRL+S )">
                <Button
                  id="saveBudget"
                  color="green"
                  appearance="subtle"
                  onClick={() => budgetSaveHandler()}
                  disabled={!modified ? true : false}
                >
                  <Icon icon="check-circle" /> Salvar
                </Button>
              </ToolTip>
            </div>
          </FooterForm>
        </BudgetFormBody>
      </BudgetFormContainer>
    )
  );
};
