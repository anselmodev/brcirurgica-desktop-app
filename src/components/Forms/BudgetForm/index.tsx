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
  Input,
  Toggle,
  Checkbox
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
  resultBudgetAction,
  toggleBudgetAction
} from "_core/redux/actions";
import { ToolTip, PopOver } from "components/ToolTip";
import selectData from "components/Forms/jsonFiles/status-select.json";
import  { InputText, InputDatePicker, InputSelectPicker } from '../inputElements';
import  { 
  inputMask,
  formatValue, 
  statusNames, 
  statusIcons, 
  statusTextColors, 
  statusBackgroundColors, 
  calendarDate
} from '_core/helpers';

export const BudgetForm = () => {
  const dateNow = new Date();
  const [stateLoader, setStateLoader] = useState(false); // preloader
  const [formModified, setFormModified] = useState(false);
  const [productsAndCustomer, setProductsAndCustomer] = useState({ customer: false, products: false });
  const { locked } = useSelector((state: any) => state.lockScreen.data);
  const { open, number, dataBudget } = useSelector( (state: any) => state.budget.data );
  const debounceFunction = useRef( _.debounce((funcAction: Function) => funcAction(), 500) );
  const dispatch = useDispatch();

  const toggleAnimationForm = (open: boolean, callback?: Function) => {
      const formElement = document.querySelector("#budgetForm");

      if (open) {
        TweenMax.to(formElement, 0.3, {
          bottom: 0,
          onComplete: () => {
            callback && callback();
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
  const budgetClose = () => {
    toggleAnimationForm(false);
  };
  const customerListExists = (action?: boolean) => {
    if (action) {
      // pegar dados do cliente e popular no form
      setProductsAndCustomer(prevVal => ({ ...prevVal, customer: true }));
    } else {
      // remover cliente do orçamento
      setProductsAndCustomer(prevVal => ({ ...prevVal, customer: false }));
    }
    // modifiedForm(true);
  };
  const productListExists = (action?: boolean) => {
    if (action) {
      // pegar dados do produto e popular na lista,  atualizando os valores
      setProductsAndCustomer(prevVal => ({ ...prevVal, products: true }))
    } else {
      // remover produto da lista, atualizando os valores
      setProductsAndCustomer(prevVal => ({ ...prevVal, products: false }))
    }
    // modifiedForm(true);
  };
  const budgetSave = (confirmExit?: boolean) => {
    // se não existir número, gerar um número para o orçamento.
    
    setStateLoader(true);
    if (confirmExit) {
      console.log("Confirmar, Salvar alterações e sair");
    } else {
      console.log("Salvar alterações");
    }
  };
  const budgetNewForm = () => {
    console.log("Novo orçamento");
  };
  const budgetDelete = () => {
    console.log("Excluir orçamento");
  };
  const budgetPdf = () => {
    console.log("Gerar PDF do orçamento");
  };
  const checkExpiredBudget = () => {
    console.log("Verificar e alertar orçamento expirado");
  };
  const calculateBudget = () => {
    const getTotalProductsPrice = calculateTotalProductsPrice(dataBudget.os_products);
    const getPriceDelivery = dataBudget.os_deliveryprice;
    const getDiscountValue = dataBudget.os_discount;
    const getParcelsNumber = dataBudget.os_parcel;
    const getTaxValue = dataBudget.os_jurosparcel;

    // from these variables:
      // calculate total general
      // calculate total with discount
      // calculate tax price from total
      // calculate parcel price from total
      // calculate commission price from total general or from total with discount "os_commissiondef"

      // SCHOW RESULTS ON BUDGET

    console.log({
      getTotalProductsPrice,
      getPriceDelivery,
      getDiscountValue,
      getParcelsNumber,
      getTaxValue
    });


    // dispatch(resultBudgetAction({
    //   totalCalculate: {
    //     totalGeneral: getTotalProductsPrice,
    //     totalDiscount: getDiscountValue,
    //     totalParcel: getParcelsNumber,
    //     totalCommission: ""
    //   }
    // }));

  };
  const calculateTotalProductsPrice = (listProducts: any) => {
    if(listProducts && Object.keys(listProducts).length) {
      return Object.keys(listProducts).map(
        key => listProducts[key].list_totalprod
        ).reduce((total, value) => {
          return parseFloat((
            Number(formatValue( "toMoney", total, {toSave: true} )) +
            Number(formatValue( "toMoney", value, {toSave: true} ))
          ).toString()).toFixed(2);;
        });
    }
  };
  const calculateProductQuantity = (idProdList: string | number) => {
    debounceFunction.current(() => {
      setFormModified(true);

      const priceProduct = (document.getElementById(`prod-${idProdList}`) as HTMLInputElement).value;
      const quantityProduct = (document.getElementById(`quant-${idProdList}`) as HTMLInputElement).value;

      // calculate price from quantity
      const calculateTotal = parseFloat(
        (Number(formatValue( "toMoney", priceProduct, {toSave: true} )) * Number(quantityProduct)).toString()
      ).toFixed(2);

      // find index product from "os_products"
      let findIndexProduct = _.findIndex(dataBudget.os_products, { 'list_idprod': `${idProdList}` });
      
      //update product data
      const productUpdated = [
        parseInt(findIndexProduct),
        {
          list_idprod: `${idProdList}`,
          list_univalprod: `${formatValue( "toMoney", priceProduct, {toSave: true} )}`,
          list_quantprod: Number(quantityProduct),
          list_totalprod: calculateTotal
        }
      ];

      dispatch(resultBudgetAction({
        productQuantityUpdate: productUpdated
      }));

      // update total list values
      (document.getElementById("sumListProd") as any).textContent = 
      `R$  ${formatValue("toMoney", calculateTotalProductsPrice(dataBudget.os_products))}` || "0,00";

      // updateCalc
      (document.getElementById("btnUpdateCalc") as HTMLInputElement).click();
    });
  };
  const inputBudgetData = (keyData: object, debounce?: boolean, updateCalc?: boolean) => {
    if(debounce) {
      debounceFunction.current(() => {
        setFormModified(true);
        dispatch(resultBudgetAction({
          dataBudget: {
            ...keyData
          }
        }));

        if(updateCalc) {
          (document.getElementById("btnUpdateCalc") as HTMLInputElement).click();
        }
      });
    } else {
      setFormModified(true);
      dispatch(resultBudgetAction({
        dataBudget: {
          ...keyData
        }
      }));
      if(updateCalc) {
        (document.getElementById("btnUpdateCalc") as HTMLInputElement).click();
      }
    }
  };
  const populateForm = () => {
    if(open) {
      
      (document.getElementById("shippingTime") as HTMLInputElement).value = dataBudget.os_delivery || "";
      (document.getElementById("shippingPrice") as HTMLInputElement).value = formatValue("toMoney", `${dataBudget.os_deliveryprice}`) || "0.00";
      (document.getElementById("customerContactName") as HTMLInputElement).value = dataBudget.os_att || "";
      (document.getElementById("feedbackNotes") as HTMLInputElement).value = dataBudget.os_feedback || "";
      (document.getElementById("percentDiscount") as HTMLInputElement).value = dataBudget.os_discount || "0";
      (document.getElementById("parcelTimes") as HTMLInputElement).value = dataBudget.os_parcel || "0";
      (document.getElementById("percentTax") as HTMLInputElement).value = dataBudget.os_jurosparcel || "0";
      (document.getElementById("paymentMode") as HTMLInputElement).value = dataBudget.os_faturado || "";
      
      // custoemr data
      if(dataBudget.os_customer_data) {
        setProductsAndCustomer((oldState: any) => ({...oldState, customer: true}));
      }
  
      // total value products list
      if(dataBudget.os_products) {
        setProductsAndCustomer((oldState: any) => ({...oldState, products: true}));
        setTimeout(() => {
          (document.getElementById("sumListProd") as any).textContent = 
          `R$  ${formatValue("toMoney", calculateTotalProductsPrice(dataBudget.os_products))}` || "0,00";
        }, 800);
      }
      
      setStateLoader(false);
    }
  };

  const addRemoveCustomer = (type: 'add' | 'update' | 'remove') => {
    if(type === "add") {
      // open search and search customer
      // from search, add customer selected.
      // add customer on dataBudget.
      // show customer line
    } else if(type === "update") {  
      // open search and search customer
      // from search, add customer selected.
      // update customer on dataBudget.
    } else if(type === "remove") {  
     // remove customer from dataBudget.
      // hide customer line.
    }
  };
  const addRemoveProduct = (type: 'add' | 'update' | 'remove') => {
    if(type === "add") {
      // open search and search products
      // from search, add products selected.
      // add products on dataBudget.
      // show products line
    } else if(type === "update") {  
      // open search and search products
      // from search, add products selected.
      // update products on dataBudget.
    } else if(type === "remove") {  
      // remove produt from list
      // remove products from dataBudget.
      // if no have item on list, hide products line.
    }
  };

  Mousetrap.bind(["ctrl+n", "ctrl+s", "ctrl+shift+s", "ctrl+q"], function(e) {
    if (e.ctrlKey && !e.shiftKey && e.code === "KeyS") {
      if (!locked && open && formModified) {
        debounceFunction.current(() => budgetSave());
      }
    } else if (e.ctrlKey && e.shiftKey && e.code === "KeyS") {
      if (!locked && open && formModified) {
        debounceFunction.current(() => budgetSave(true));
      }
    } else if (e.ctrlKey && e.code === "KeyN") {
      if (!locked && open && formModified) {
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
      if (!locked && open && !formModified) {
        budgetClose();
      } else if (!locked && open && formModified) {
        console.log("salvar antes de sair?");
      }
    }
  });

  useEffect(() => {
    if (open) {
      toggleAnimationForm(open, () => {
        if (number) {
          setStateLoader(true);
          // from BD
          import(`mockData/mockSingleBudget-${number}.json`).then((res) => {
            dispatch(resultBudgetAction({
              dataBudget: res.default
            }));
          });
        }
      });
    };

    // unmount component
    return () => {
      productListExists();
      customerListExists();
      setFormModified(false);
    };
  }, [open, number, dispatch]);

  useEffect(() => {
    if(Object.keys(dataBudget).length) {
      populateForm();
    }
  }, [dataBudget]);

  return (
    open && (
      <BudgetFormContainer>
        <BudgetFormBody id="budgetForm">
          {/* Close button */}
          <ToolTip placement="bottom" content="Fechar: ( CTRL+Q )">
            <BtnCloseForm onClick={() => budgetClose()}>
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
          <HeaderForm 
            bgColor={statusBackgroundColors(parseInt(dataBudget.os_status))}
            txtColor={statusTextColors(parseInt(dataBudget.os_status))}
          >
            <WaterIcon>
              <Icon icon={statusIcons(parseInt(dataBudget.os_status))} />
            </WaterIcon>

            <LeftBlockInfo>
              <p className="customer-name">
                {
                  Object.keys(dataBudget).length && dataBudget.os_customer_data ? 
                  dataBudget.os_customer_data.cust_razao : '------'
                }
              </p>
              <p className="customer-contact">
                Contato: {" "}
                <b>
                  {
                    Object.keys(dataBudget).length && dataBudget.os_att ? 
                    dataBudget.os_att : '------'
                  }  
                </b>
              </p>
              <p className="customer-contact">
                E-mail: {" "}
                <b>
                  {
                    Object.keys(dataBudget).length && dataBudget.os_customer_data ? 
                    dataBudget.os_customer_data.cust_email : '------'
                  }
                </b>
              </p>
              <p className="customer-contact">
                Telefones: {" "}
                <b>
                  {
                    Object.keys(dataBudget).length && dataBudget.os_customer_data ? 
                    `${dataBudget.os_customer_data.cust_phone} / ${dataBudget.os_customer_data.cust_cellphone}` : '------'
                  }
                </b>
              </p>
            </LeftBlockInfo>

            <RightBlockInfo>
              <p className="os-number">
                OS Número:  {" "}
                <b>
                  {
                    Object.keys(dataBudget).length && dataBudget.os_number ? 
                    dataBudget.os_number : '------'
                  }
                </b>
              </p>
              <p className="os-date">
                Criado em: {" "} 
                <b>
                  {
                    Object.keys(dataBudget).length && dataBudget.os_emit ? 
                    calendarDate(undefined, undefined, dataBudget.os_emit, "L")  : '--/--/----'
                  }
                </b>
              </p>
              <p className="os-status">
                Status: {" "}
                <b>
                {
                  Object.keys(dataBudget).length && dataBudget.os_status ? 
                  statusNames(parseInt(dataBudget.os_status)) : 'Rascunho'
                }
                </b>
              </p>
              <p className="os-value">
                Total Bruto: {" "}
                <b>
                  R$ {
                  Object.keys(dataBudget).length && dataBudget.os_totalbruto ? 
                  formatValue('toMoney', dataBudget.os_totalbruto)  : '0,00'
                }
                </b>
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
                    <InputSelectPicker 
                      id="statusBudget"
                      label="Status"
                      placeholder="Selecione ..."
                      required
                      cleanable={false}
                      data={selectData}
                      searchable={false}
                      onChange={(ev: any) => {
                        inputBudgetData({os_status: ev});
                      }}
                      value={dataBudget.os_status || "5"}
                      disabledItemValues={dataBudget.os_number ? ["5"] : ["0"]}
                    />
                  </Col>
                  <Col xs={24} sm={24} md={8}>
                    <InputDatePicker 
                      id="dateEmmit"
                      label="Data de Emissão"
                      required
                      format="DD/MM/YYYY"
                      placeholder="DD/MM/YYYY"
                      value={ dataBudget.os_emit || dateNow}
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
                      value={ dataBudget.os_update || dateNow}
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
                      onChangeCalendarDate={(val: any) => {
                        inputBudgetData({
                          os_expire: calendarDate(undefined, undefined, val, "YYYY-MM-DD HH:mm:ss")
                        });
                      }}
                      value={ dataBudget.os_expire || null}
                      oneTap
                      cleanable={false}
                    />
                  </Col>
                  <Col xs={24} sm={24} md={8}>
                    <InputText 
                      defaultValue=""
                      id="shippingTime"
                      label="Frete / Prazo" 
                      tip="( Ex: De 1 a 10 dias )" 
                      placeholder="Digite ..." 
                      onChange={(ev: any) => {
                        inputBudgetData({os_delivery: ev}, true);
                      }}
                    />
                  </Col>
                  <Col xs={24} sm={24} md={8}>
                    <InputText 
                      defaultValue="0,00"
                      id="shippingPrice"
                      label="Valor do Frete" 
                      tip="( R$ )" 
                      placeholder="Digite ..." 
                      onChange={(ev: any) => {
                        inputMask("toMoney", "#shippingPrice");
                        inputBudgetData({
                          os_deliveryprice: formatValue("toMoney", `${ev}`, {toSave: true})
                        }, true, true);
                      }}
                    />
                    <div style={{width: '78%', height: 20, marginLeft: 5}}>
                      <Checkbox 
                        checked={dataBudget.os_deliverysum}
                        onChange={(ev) => {
                          inputBudgetData({
                            os_deliverysum: !dataBudget.os_deliverysum || dataBudget.os_deliverysum === 0 ? 1 : 0
                          }, false, true);
                        }}
                      >
                      <small style={{ padding: 2}}>
                        {" "}Somar Frete ao valor final?
                      </small>
                      </Checkbox>
                    </div>
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
                            <PopOver title="Cliente: " placement="bottom" trigger='hover' content={
                                dataBudget.os_customer_data ?
                                <small>
                                  <p><b>Código: </b>{dataBudget.os_customer_data.cust_code}</p>
                                  <p><b>Nome: </b>{dataBudget.os_customer_data.cust_razao}</p>
                                  <p><b>E-mail: </b>{dataBudget.os_customer_data.cust_email}</p>
                                  <p><b>CPF/CNPJ: </b>{dataBudget.os_customer_data.cust_cpfcnpj}</p>
                                  <p><b>Telefone: </b>{dataBudget.os_customer_data.cust_phone}</p>
                                  <p><b>Celular: </b>{dataBudget.os_customer_data.cust_cellphone}</p>
                                </small>
                                : "-------"
                              }>
                              <TableLineContent style={{ lineHeight: '20px' }}>
                                {dataBudget.os_customer_data ? dataBudget.os_customer_data.cust_razao : "----"}
                              </TableLineContent>
                            </PopOver>
                          </TableLineContainerInput>
                        </Col>
                        <Col xs={5} sm={5} md={5}>
                          <TableLineContainerInput >
                            <TableLineContent style={{ lineHeight: '20px' }}>
                            {dataBudget.os_customer_data ? dataBudget.os_customer_data.cust_phone : "----"}
                            </TableLineContent>
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
                              onClick={() => customerListExists()}
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
                        onClick={() => customerListExists(true)}
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
                      defaultValue=""
                      id="customerContactName"
                      label="Nome do Contato / Cliente" 
                      tip="( Será visível na folha )" 
                      placeholder="Digite ..." 
                      style={{width: "97%"}} 
                      onChange={(ev: any) => { 
                        inputBudgetData({os_att: ev}, true);
                      }}
                    />
                  </Col>
                </Row>

                {/* LINE 5 - feedback */}
                <Row className="row-form">
                  <Col xs={24} sm={24} md={24}>
                    <InputText 
                      defaultValue=""
                      id="feedbackNotes"
                      label="Feedback Interno" 
                      componentClass="textarea"
                      tip="( Não será visível na folha )" 
                      placeholder="Digite ..." 
                      style={{width: "97%", height: 150}}
                      onChange={(ev: any) => { 
                        inputBudgetData({os_feedback: ev}, true);
                      }}
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
                      <small className="input-tips"> 
                        {" "}( {dataBudget.os_prod_origin && dataBudget.os_prod_origin.length} íten(s) na lista )
                      </small>
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
                          {/* Cell Product */}
                          {
                            dataBudget.os_prod_origin ? 
                            dataBudget.os_prod_origin.map((item: any, indx: number) => {
                              return (
                              <TableLineContainerTable key={item.prod_code}>
                                <Col xs={3} sm={3} md={3}>
                                  <TableLineContent>
                                    {item.prod_code}
                                  </TableLineContent>
                                </Col>
                                <Col xs={6} sm={6} md={6}>
                                  <PopOver title="Produto: " placement="bottom" trigger='hover' content={
                                    <small>
                                      <p><em><b>Código: </b>{item.prod_code}</em></p>
                                      <p><em><b>Nome: </b>{item.prod_name}</em></p>
                                      <p>
                                        <em><b>Preço de Cadastro: </b>R$ {formatValue("toMoney", item.prod_price)}</em>
                                      </p>
                                    </small>
                                  }>
                                    <TableLineContent>
                                      {item.prod_name}
                                    </TableLineContent>
                                  </PopOver>
                                </Col>
                                <Col xs={5} sm={5} md={5}>
                                  <TableLineContent>
                                    <Input
                                      id={`prod-${item.id}`}
                                      defaultValue={
                                        formatValue("toMoney", dataBudget.os_products[indx].list_univalprod) || "0,00"
                                      }
                                      size="sm" placeholder="0,00"
                                      style={{ width: 130 }}
                                      onChange={() => {
                                        inputMask("toMoney", `#prod-${item.id}`);
                                        calculateProductQuantity(item.id);
                                      }}
                                    />
                                  </TableLineContent>
                                </Col>
                                <Col xs={3} sm={3} md={3}>
                                  <TableLineContent>
                                    <Input
                                      id={`quant-${item.id}`}
                                      defaultValue={`${dataBudget.os_products[indx].list_quantprod}` || "0"}
                                      size="sm"
                                      placeholder="0"
                                      style={{ width: 60 }}
                                      onChange={() => {
                                        inputMask("toNumber", `#quant-${item.id}`, item.id);
                                        calculateProductQuantity(item.id);
                                      }}
                                    />
                                  </TableLineContent>
                                </Col>
                                <Col xs={4} sm={4} md={4}>
                                  <TableLineContent>
                                    <b>
                                      {`${formatValue("toMoney", dataBudget.os_products[indx].list_totalprod)}` || "0,00"}
                                    </b>
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
                                      onClick={() => productListExists()}
                                    />
                                  </ToolTip>
                                </Col>
                              </TableLineContainerTable>
                              );
                            })
                            :
                            "-------"
                          }
                        </Row>

                        <Button
                          appearance="primary"
                          color="cyan"
                          size="sm"
                          style={{ marginTop: 30 }}
                          onClick={() => productListExists(true)}
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
                          <em>Valor Total em Produtos: <b id="sumListProd">R$ 0,00</b> </em>
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
                        onClick={() => productListExists(true)}
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
                      defaultValue="0"
                      id="percentDiscount"
                      label="Descontos %" 
                      tip="( Pagamentos á vista )" 
                      placeholder="Porcentagem ..." 
                      onChange={(ev: any) => { 
                        inputBudgetData({os_discount: ev}, true, true);
                      }}
                    />
                  </Col>
                  <Col xs={24} sm={24} md={8}>
                    <InputText 
                      defaultValue="0"
                      id="parcelTimes"
                      label="Parcelamento X" 
                      placeholder="Apenas números ..." 
                      onChange={(ev: any) => {
                        inputMask("toNumber", "#parcelTimes");
                        inputBudgetData({os_parcel: ev}, true, true);
                      }}
                    />
                  </Col>
                  <Col xs={24} sm={24} md={8}>
                    <InputText 
                      defaultValue="0"
                      id="percentTax"
                      label="Taxa Adicional %" 
                      placeholder="Porcentagem ..." 
                      onChange={(ev: any) => {
                        inputBudgetData({os_jurosparcel: ev}, true, true);
                      }}
                    />
                  </Col>
                </Row>

                {/* LINE 8 Bill payment and calculate button */}
                <Row className="row-form">
                  <Col xs={24} sm={24} md={24}>
                    <InputText 
                      defaultValue=""
                      id="paymentMode"
                      label="Modo de Pagamento Faturado" 
                      componentClass="textarea"
                      tip="( Será visível na folha )" 
                      placeholder="Digite ..." 
                      style={{width: "97%", height: 100}}
                      onChange={(ev: any) => { 
                        inputBudgetData({os_faturado: ev}, true);
                      }}
                    />
                  <br />
                  </Col>
                  <Col xs={24} sm={24} md={24}>
                      <div className="input-container">
                        <p style={{ width: '30%', textAlign: 'right', float: 'right', marginRight: 25 }}>
                          <Button id="btnUpdateCalc" appearance="default" onClick={() => calculateBudget()}>
                            <Icon icon="usd" /> Atualizar Cálculo
                          </Button>
                        </p>
                        <p style={{ width: '60%', textAlign: 'left', float: 'left', marginBottom: '50px', fontSize: '12px' }}>
                          <em>
                            <small>* Taxa Adicional será calculada sobre o valor BRUTO!</small><br />
                            <small>** O Desconto será aplicado sobre o valor, COM OU SEM A TAXA ADICIONAL!</small><br />
                            <small>*** Sempre Salve as Alterações Antes de Visualizar e Imprimir o Orçamento!</small><br /><br /><br />
                            {
                              dataBudget.os_user_name && 
                              <small style={{ color: '#C04544', fontSize: '12px' }}>
                                ( Orçamento emitido pelo usuário <b>"{dataBudget.os_user_name}"</b> )
                              </small>
                            }
                            <br />
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
                  budgetPdf();
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
                  budgetDelete();
                }}
              >
                <Icon icon="trash" /> Excluir
              </Button>
              <ToolTip placement="top" content="Novo: ( CTRL+N )">
                <Button
                  id="newBudget"
                  color="cyan"
                  appearance="subtle"
                  disabled={formModified || number ? false : true}
                  onClick={() => budgetNewForm()}
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
                  onClick={() => budgetSave(true)}
                  disabled={formModified ? false : true}
                >
                  <Icon icon="sign-out" /> Salvar e Sair
                </Button>
              </ToolTip>
              <ToolTip placement="top" content="Salvar: ( CTRL+S )">
                <Button
                  id="saveBudget"
                  color="green"
                  appearance="subtle"
                  onClick={() => budgetSave()}
                  disabled={formModified ? false : true}
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
