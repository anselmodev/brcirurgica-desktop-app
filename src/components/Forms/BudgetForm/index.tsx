import React, { useEffect, useState, useRef } from "react";
import { TweenMax } from "gsap/TweenMax";
import { useDispatch, useSelector } from "react-redux";
import * as _ from "lodash";
import Mousetrap from "mousetrap";
import {
  IconButton,
  Icon,
  Loader,
  Button,
  Grid,
  Row,
  Col,
  Input
} from "rsuite";
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
  Preloader,
  FormBudget,
  TableLineHead,
  TableLineContainerInput,
  TableLineContent,
  TableLineContainerTable
} from "./styles";
import {
  // resultBudgetAction,
  toggleBudgetAction
} from "../../../_core/redux/actions";
import { ToolTip } from "../../ToolTip";
import selectData from "../jsonFiles/status-select.json";

import  { InputText, InputDatePicker, InputTextPicker } from '../inputElements';

export const BudgetForm = () => {
  const dispatch = useDispatch();
  const [stateLoader, setStateLoader] = useState(false);
  const [productsAndCustomer, setProductsAndCustomer] = useState({ customer: false, products: false });
  const { locked } = useSelector((state: any) => state.lockScreen.data);
  const { open, number, modified, result } = useSelector(
    (state: any) => state.budget.data
  );
  const debounceFunction = useRef(
    _.debounce((funcAction: Function) => funcAction(), 400)
  );

  const customertHandler = (action?: boolean) => {
    if (action) {
      setProductsAndCustomer(prevVal => ({ ...prevVal, customer: true }));
    } else {
      setProductsAndCustomer(prevVal => ({ ...prevVal, customer: false }));
    }
    // modifiedForm(true);
  };
  const productHandler = (action?: boolean) => {
    if (action) {
      // add 1 product
      setProductsAndCustomer(prevVal => ({ ...prevVal, products: true }))
    } else {
      // remove 1 product
      setProductsAndCustomer(prevVal => ({ ...prevVal, products: false }))
    }
    // modifiedForm(true);
  };
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
    if (confirmExit) {
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
  const budgetModifiedHandler = () => {
    console.log("Orçamento modificado!");
  };
  const calculateBudget = () => {
    console.log('atualizar calculos!');
  };
  const calculateProduct = () => {
    // calculate single line
    // calculate all lines
    // mount updated json list
    // update budget value
    calculateBudget();
  };

  Mousetrap.bind(["ctrl+n", "ctrl+s", "ctrl+shift+s", "ctrl+q"], function(e) {
    if (e.ctrlKey && !e.shiftKey && e.code === "KeyS") {
      if (!locked && open && modified) {
        debounceFunction.current(() => budgetSaveHandler());
      }
    } else if (e.ctrlKey && e.shiftKey && e.code === "KeyS") {
      if (!locked && open && modified) {
        debounceFunction.current(() => budgetSaveHandler(true));
      }
    } else if (e.ctrlKey && e.code === "KeyN") {
      if (!locked && open && modified) {
        console.log("salvar entes de um novo orçamento?");
      } else if (!locked) {
        debounceFunction.current(() =>
          dispatch(
            toggleBudgetAction({
              open: true
            })
          )
        );
      }
    } else if (e.ctrlKey && e.code === "KeyQ") {
      if (!locked && open && !modified) {
        budgetCloseHandler();
      } else if (!locked && open && modified) {
        console.log("salvar antes de sair?");
      }
    }
  });

  useEffect(() => {
    if (open) {
      toggleAnimationForm(open);
      productHandler();
      customertHandler();
    }
  }, [open]);

  return (
    open && (
      <BudgetFormContainer>
        <BudgetFormBody id="budgetForm">
          {/* Close button */}
          <ToolTip placement="bottom" content="Fechar: ( CTRL+Q )">
            <BtnCloseForm onClick={() => budgetCloseHandler()}>
              <IconButton icon={<Icon icon="close" />} circle size="xs" />
            </BtnCloseForm>
          </ToolTip>

          {/* Preloader */}
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

            <LeftBlockInfo>
              <p className="customer-name">------</p>
              <p className="customer-contact">
                Contato: <b>------</b>
              </p>
              <p className="customer-contact">
                E-mail: <b>------</b>
              </p>
              <p className="customer-contact">
                Telefones: <b>------</b>
              </p>
            </LeftBlockInfo>

            <RightBlockInfo>
              <p className="os-number">
                OS Número: <b>{number || "-----"}</b>
              </p>
              <p className="os-date">
                Criado em: <b>--/--/----</b>
              </p>
              <p className="os-status">
                Status: <b>Rascunho</b>
              </p>
              <p className="os-value">
                Total Bruto: <b>R$ 0,00</b>
              </p>
            </RightBlockInfo>
          </HeaderForm>

          {/* CONTENT */} 
          <ContentForm className="scroll-style">
            <FormBudget id="form-budget">
              <Grid fluid>
                {/* LINE 1 - status, and dates */}
                <Row className="row-form">
                  <Col xs={24} sm={24} md={8}>
                    <InputTextPicker 
                      id="satusBudget"
                      label="Status"
                      placeholder="Selecione ..."
                      required
                      data={selectData}
                    />
                  </Col>
                  <Col xs={24} sm={24} md={8}>
                    <InputDatePicker 
                      id="dateEmmit"
                      label="Data de Emissão"
                      required
                      format="DD/MM/YYYY"
                      placeholder="DD/MM/YYYY"
                      disabled
                    />
                  </Col>
                  <Col xs={24} sm={24} md={8}>
                    <InputDatePicker 
                      id="dateUpdate"
                      label="Última Atualização"
                      required
                      format="DD/MM/YYYY"
                      placeholder="DD/MM/YYYY"
                      disabled
                    />
                  </Col>
                </Row>

                {/* LINE 2 - expire and shipping value */}
                <Row className="row-form">
                  <Col xs={24} sm={24} md={8}>
                    <InputDatePicker 
                      id="dateExpire"
                      label="Validade do Orçamento"
                      required
                      format="DD/MM/YYYY"
                      placeholder="Selecione ..."
                      oneTap
                      cleanable={false}
                    />
                  </Col>
                  <Col xs={24} sm={24} md={8}>
                    <InputText 
                      id="shippingTime"
                      label="Frete / Prazo" 
                      tip="( Ex: De 1 a 10 dias )" 
                      placeholder="Digite ..." 
                    />
                  </Col>
                  <Col xs={24} sm={24} md={8}>
                    <InputText 
                      id="shippingPrice"
                      label="Valor do Frete" 
                      tip="( R$ )" 
                      placeholder="Digite ..." 
                    />
                  </Col>
                </Row>

                {/* LINE 3 - customer */}
                <Row className="row-form">
                {
                  productsAndCustomer.customer
                  ?
                  <Col xs={24} sm={24} md={24}>
                    <div className="input-container">
                      <span className="input-title">
                        <Icon icon="circle" className="input-icon-required" />{" "}
                        Cliente
                      </span>
                      <Row>
                        <Col xs={16} sm={16} md={16}>
                          <TableLineHead>Nome / Razão</TableLineHead>
                        </Col>
                        <Col xs={5} sm={5} md={5}>
                          <TableLineHead>Telefone</TableLineHead>
                        </Col>
                        <Col xs={3} sm={3} md={3}>
                          <TableLineHead>Ação</TableLineHead>
                        </Col>
                      </Row>
                      <Row>
                        <Col xs={16} sm={16} md={16}>
                          <TableLineContainerInput>
                            <ToolTip placement="bottom" trigger='hover' content={'Nome do Cliente aqui ...'}>
                              <TableLineContent style={{ lineHeight: '20px' }}>Nome do Cliente aqui ...</TableLineContent>
                            </ToolTip>
                          </TableLineContainerInput>
                        </Col>
                        <Col xs={5} sm={5} md={5}>
                          <TableLineContainerInput >
                            <TableLineContent style={{ lineHeight: '20px' }}>00-0000-0000</TableLineContent>
                          </TableLineContainerInput>
                        </Col>
                        <Col xs={3} sm={3} md={3}>
                          <ToolTip placement="bottom" trigger='hover' content="Abrir dados do cliente">
                            <IconButton
                              icon={<Icon icon="folder-open" />}
                              circle
                              size="sm"
                              style={{ position: 'relative', top: '3px' }}
                            />
                          </ToolTip>
                          <ToolTip placement="bottom" trigger='hover' content="Remover cliente do orçamento">
                            <IconButton
                              icon={<Icon icon="minus" />}
                              circle
                              size="sm"
                              color="red"
                              style={{ marginLeft: '10px', position: 'relative', top: '3px' }}
                              onClick={() => customertHandler()}
                            />
                          </ToolTip>
                        </Col>
                      </Row>    
                    </div>
                  </Col>
                  : 
                  <Col xs={24} sm={24} md={24}>
                    <div className="input-container">
                      <span className="input-title">
                        <Icon icon="circle" className="input-icon-required" />{" "}
                        Cliente
                      </span> <br />
                      <Button
                        size="sm"
                        color="cyan"
                        appearance="primary"
                        onClick={() => customertHandler(true)}
                      >
                        <Icon icon="group" /> Adicionar Cliente
                      </Button>
                    </div>
                  </Col>
                }
                </Row>

                {/* LINE 4 - contact name */}
                <Row className="row-form">
                  <Col xs={24} sm={24} md={24}>
                    <InputText 
                      id="shippingPrice"
                      label="Nome do Contato / Cliente" 
                      tip="( Será visível na folha )" 
                      placeholder="Digite ..." 
                      style={{width: "97%"}} 
                    />
                  </Col>
                </Row>

                {/* LINE 5 - feedback */}
                <Row className="row-form">
                  <Col xs={24} sm={24} md={24}>
                    <InputText 
                      id="feedbackNotes"
                      label="Feedback Interno" 
                      componentClass="textarea"
                      tip="( Não será visível na folha )" 
                      placeholder="Digite ..." 
                      style={{width: "97%", height: 150}}
                    />
                  </Col>
                </Row>

                {/* LINE 6 - product list */}
                <Row className="row-form">
                {
                  productsAndCustomer.products
                  ?
                  <Col xs={24} sm={24} md={24}>
                    <div className="input-container">
                      <span className="input-title">
                        <Icon icon="circle" className="input-icon-required" />{" "}
                        Lista de Produtos
                      </span>
                      <small className="input-tips"> 1 íten(s) na lista</small>
                      <div style={{ width: '96.9%', padding: 15, borderRadius: 6, border: '1px solid #e5e5ea', margin: '3px 0', position: 'relative' }}>
                        <Row>
                          <Col xs={3} sm={3} md={3}>
                            <TableLineHead>Cod.</TableLineHead>
                          </Col>
                          <Col xs={6} sm={6} md={6}>
                            <TableLineHead>Nome</TableLineHead>
                          </Col>
                          <Col xs={5} sm={5} md={5}>
                            <TableLineHead>Valor Unit. ( R$ )</TableLineHead>
                          </Col>
                          <Col xs={3} sm={3} md={3}>
                            <TableLineHead>Quant.</TableLineHead>
                          </Col>
                          <Col xs={4} sm={4} md={4}>
                            <TableLineHead>Valor Total ( R$ )</TableLineHead>
                          </Col>
                          <Col xs={3} sm={3} md={3}>
                            <TableLineHead>Ação</TableLineHead>
                          </Col>
                        </Row>
                        <Row>
                          <TableLineContainerTable>
                            <Col xs={3} sm={3} md={3}>
                              <TableLineContent>29787492</TableLineContent>
                            </Col>
                            <Col xs={6} sm={6} md={6}>
                              <ToolTip placement="left" trigger='hover' content={'SERRA ELÉTRICA PARA GESSO, COM DISCO DE 2 E 2,5 POLEGADAS'}>
                                <TableLineContent>SERRA ELÉTRICA PARA GESSO, COM DISCO DE 2 E 2,5 POLEGADAS</TableLineContent>
                              </ToolTip>
                            </Col>
                            <Col xs={5} sm={5} md={5}>
                              <TableLineContent>
                                <Input
                                  id={'prodID'}
                                  // defaultValue={formatValue.toMoney('120.00')}
                                  size="sm" placeholder="0,00"
                                  style={{ width: 130 }}
                                  onChange={(eValue) => {
                                    // currencyFormat('#prodID', eValue);
                                    // calculateProduct(currencyFormat('#prodID', eValue, true));
                                  }}
                                />
                              </TableLineContent>
                            </Col>
                            <Col xs={3} sm={3} md={3}>
                              <TableLineContent>
                                <Input
                                  id={'prodQtId'}
                                  size="sm"
                                  defaultValue="1"
                                  placeholder="0"
                                  style={{ width: 60 }}
                                  onChange={(ev) => {
                                    // numberFormat('#prodQtId', ev);
                                    // calculateProduct(ev);
                                  }}
                                />
                              </TableLineContent>
                            </Col>
                            <Col xs={4} sm={4} md={4}>
                              <TableLineContent>
                                R$ 00.000.000,00
                                {/* <b>{formatValue.toMoney(12000)}</b> */}
                              </TableLineContent>
                            </Col>

                            <Col xs={3} sm={3} md={3}>
                              <ToolTip placement="bottom" trigger='hover' content="Abrir dados do produto">
                                <IconButton
                                  icon={<Icon icon="folder-open" />}
                                  circle size="xs"
                                  style={{ position: 'relative', top: '3px' }}
                                />
                              </ToolTip>
                              <ToolTip placement="bottom" trigger='hover' content="Remover produto do orçamento">
                                <IconButton
                                  icon={<Icon icon="minus" />}
                                  circle size="xs"
                                  color="red"
                                  style={{ marginLeft: '10px', position: 'relative', top: '3px' }}
                                  onClick={() => productHandler()}
                                />
                              </ToolTip>
                            </Col>
                          </TableLineContainerTable>
                        </Row>

                        <Button
                          appearance="primary"
                          color="cyan"
                          size="sm"
                          style={{ marginTop: 30 }}
                          onClick={() => productHandler(true)}
                        >
                          <Icon icon="barcode" /> Adicionar Produto à Lista
                        </Button>

                        <p style={{
                          position: 'absolute',
                          bottom: '15px',
                          right: '30px',
                          fontSize: '12px',
                          color: '#1EBCD2'
                        }}>
                          <em>Valor Total em Produtos: <b>R$ 000.000.000,00</b></em>
                        </p>
                      </div>
                    </div>
                  </Col>
                  : 
                  <Col xs={24} sm={24} md={24}>
                    <div className="input-container">
                      <span className="input-title">
                        <Icon icon="circle" className="input-icon-required" />{" "}
                        Lista de Produtos
                      </span>
                      <br />
                      <Button
                        size="sm"
                        appearance="primary"
                        color="cyan"
                        onClick={() => productHandler(true)}
                      >
                        <Icon icon="barcode" /> Adicionar Produto
                      </Button>
                    </div>
                  </Col>
                }
                </Row>

                {/* LINE 7 - discounts, installments and taxs */}
                <Row className="row-form">
                  <Col xs={24} sm={24} md={8}>
                    <InputText 
                      id="percentDiscount"
                      label="Descontos %" 
                      tip="( Pagamentos á vista )" 
                      placeholder="Porcentagem ..." 
                    />
                  </Col>
                  <Col xs={24} sm={24} md={8}>
                    <InputText 
                      id="parcelTimes"
                      label="Parcelamento X" 
                      placeholder="Apenas números ..." 
                    />
                  </Col>
                  <Col xs={24} sm={24} md={8}>
                    <InputText 
                      id="percentTax"
                      label="Taxa Adicional %" 
                      placeholder="Porcentagem ..." 
                    />
                  </Col>
                </Row>

                {/* LINE 8 Bill payment and calculate button */}
                <Row className="row-form">
                  <Col xs={24} sm={24} md={24}>
                    <InputText 
                      id="paymentMode"
                      label="Modo de Pagamento Faturado" 
                      componentClass="textarea"
                      tip="( Será visível na folha )" 
                      placeholder="Digite ..." 
                      style={{width: "97%", height: 100}}
                    />
                    <br />
                    </Col>
                    <Col xs={24} sm={24} md={24}>
                      <div className="input-container">
                        <p style={{ width: '30%', textAlign: 'right', float: 'right', marginRight: 25 }}>
                          <Button appearance="default" onClick={() => calculateBudget()}>
                            <Icon icon="usd" /> Atualizar Cálculo
                          </Button>
                        </p>
                        <p style={{ width: '60%', textAlign: 'left', float: 'left', marginBottom: '50px', fontSize: '12px' }}>
                          <em>
                            <small>* Taxa Adicional será calculada sobre o valor BRUTO!</small><br />
                            <small>** O Desconto será aplicado sobre o valor, COM OU SEM A TAXA ADICIONAL!</small><br />
                            <small>*** Sempre Salve as Alterações Antes de Visualizar e Imprimir o Orçamento!</small><br /><br /><br />
                            <small style={{ color: '#C04544', fontSize: '12px' }}>( Orçamento emitido pelo usuário <b>"NOME USUARIO"</b> )</small><br />
                          </em>
                        </p>
                      </div>
                  </Col>
                </Row>
              </Grid>
            </FormBudget>
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
