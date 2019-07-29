import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { History } from "history";
import * as _ from "lodash";
import { Input, InputGroup, Icon, Button, Loader } from "rsuite";
import Mousetrap from "mousetrap";
import { SearchContainer } from "./styles";
import { ToolTip, PopOver } from "components/ToolTip";
import { toggleSearchAction, resultSearchAction } from "_core/redux/actions";
import { calendarDate } from "_core/helpers/dateFormat";

type Props = {
  history: History;
};
export const Search = (props: Props) => {
  const dispatch = useDispatch();
  const [loaderResults, setLoaderResults] = useState(false);
  const { locked } = useSelector((state: any) => state.lockScreen.data);
  const search = useSelector((state: any) => state.search.data);
  const inputAutoFocus = useRef<HTMLInputElement>();
  const debounce = useRef(
    _.debounce((filter?: any) => handlerSearch(filter), 800)
  );

  const FilterType = () => {
    return (
      <div>
        <Button
          size="xs"
          style={{ margin: "5px" }}
          appearance="ghost"
          onClick={() => handlerSearch("Orçamentos")}
        >
          Orçamentos
        </Button>
        <Button
          size="xs"
          style={{ margin: "5px" }}
          appearance="ghost"
          onClick={() => handlerSearch("Clientes")}
        >
          Clientes
        </Button>
        <Button
          size="xs"
          style={{ margin: "5px" }}
          appearance="ghost"
          onClick={() => handlerSearch("Produtos")}
        >
          Produtos
        </Button>
        <Button
          size="xs"
          style={{ margin: "5px" }}
          appearance="ghost"
          onClick={() => handlerSearch("Usuários")}
        >
          Usuários
        </Button>
      </div>
    );
  };

  const handlerSearch = (
    filter?: "Orçamentos" | "Clientes" | "Usuários" | "Produtos"
  ) => { 
    setLoaderResults(true);
    const getTerm: any = document.querySelector("#input-search");
    if (getTerm && getTerm.value.length >= 3) {
      
      // buscar no banco
      setTimeout(() => {
        requestDB(getTerm.value, filter);
      }, 1000);

    } else {
      setLoaderResults(false);
      dispatch(
        resultSearchAction({
          result: []
        })
      );
    }
  };

  // Request to DB
  const requestDB = (term: string, filter?: any) => {
    const resultDb =
      !filter || filter === "Orçamentos"
        ? [
            {
              id: 1,
              number: 2862,
              name: "PETICULAR WARREN HENDRIX",
              dateUpd: "2019-07-02 00:00:00"
            },
            {
              id: 2,
              number: 2962,
              name: "BIOTICA AUSTIN BLAKE",
              dateUpd: "2019-07-02 00:00:00"
            }
          ]
        : filter === "Produtos"
        ? [
            {
              id: 1,
              code: 2862,
              name: "PRODUCT BEST 1",
              price: 123.0,
              dateUpd: "2019-07-02 00:00:00"
            },
            {
              id: 2,
              code: 2962,
              name: "PRODUCT BEST 2",
              price: 45.45,
              dateUpd: "2019-07-02 00:00:00"
            }
          ]
        : filter === "Clientes"
        ? [
            {
              id: 1,
              cpfCnpj: "357.080.528-05",
              name: "VALERIA ANDRADE",
              email: "val.andrade21@yahoo.com.br",
              phone: "(11) 9242-8971",
              dateAdd: "2019-07-02 00:00:00"
            },
            {
              id: 2,
              cpfCnpj: "05.452.786/0001-00",
              name: "JUSTICA FEDERAL DE PRIMEIRO GRAU EM MINAS GERAIS",
              email: "larissa.goncalves@trf1.jus.br",
              phone: "(31) 3501-1367",
              dateUpd: "2019-07-02 00:00:00"
            }
          ]
        : filter === "Usuários"
        ? [
            {
              id: 1,
              userName: "brcirurgica",
              name: "VALERIA ANDRADE",
              email: "vendas@brcirurgica.com.br",
              phone: "(11) 3938-9661",
              dateAdd: "2019-07-02 00:00:00"
            },
            {
              id: 2,
              userName: "VENDAS3",
              name: "SUELLEN BONFIM",
              email: "vendas@brcirurgica.com.br",
              phone: "(11) 2924-9414",
              dateAdd: "2019-07-02 00:00:00"
            }
          ]
        : [];

    if (resultDb.length !== 0) {
      setLoaderResults(false);
      dispatch(
        resultSearchAction({
          result: resultDb,
          filter
        })
      );
    } else {
      setLoaderResults(false);
      dispatch(
        resultSearchAction({
          result: [
            {
              noResult: true
            }
          ]
        })
      );
    }
  };

  if (search.open) {
    setTimeout(() => {
      if (inputAutoFocus && inputAutoFocus.current) {
        inputAutoFocus.current.focus();
      }
    }, 500);
  }
  Mousetrap.bind("ctrl+p", function() {
    if (!locked) {
      dispatch(toggleSearchAction({ open: true }));
    }
  });

  return (
    search.open && (
      <SearchContainer>
        <div className="content-search">
          {/* Close Button */}
          <ToolTip placement="bottom" trigger="hover" content="Fechar Pesquisa">
            <p
              className="btn-exit-search"
              onClick={() =>
                dispatch(toggleSearchAction({ open: false }))
              }
            >
              <Icon icon="close-circle" size="2x" />
            </p>
          </ToolTip>

          {/* Input Search */}
          <InputGroup inside className="group-search">
            <Input
              id="input-search"
              inputRef={inputAutoFocus}
              placeholder="Pesquisar ..."
              onKeyUp={() => {
                debounce.current();
              }}
            />
            { search.result.length ?
              <PopOver
                placement="topRight"
                trigger="hover"
                content={<FilterType />}
                title="Filtrar por:"
              >
                <InputGroup.Button>
                  <Icon icon="filter" /> Filtros
                </InputGroup.Button>
              </PopOver>
            : <InputGroup.Button disabled>
                <Icon icon="filter" /> Filtros
              </InputGroup.Button>
            }
          </InputGroup>

          {!search.result || search.result.length === 0 ? (
            <p className="tips-search">
              Pesquise por: Orçamentos, Clientes Produtos ou Usuários! <br />
              <small>
                <em>( Mínimo de 3 caracteres )</em>
              </small>
            </p>
          ) : (
            <div className="result-search">
              {/* Results Menu */}
                <p className="title-result-search">
                  Resultados em <b>{search.filter}</b>:
                </p>

              {/* Results Box */}
              <div className="list-results scroll-style">
                <div id="res-budgets">
                  {
                    loaderResults && 
                    <span className="loader-result">
                      <span><Loader size="md" /></span>
                    </span>
                  }
                  {search.result.length && search.result[0].noResult ? (
                    <p className="search-noresult">
                      Nenhum resultado com o termo digitado!
                    </p>
                  ) : (
                    <div>
                      {
                        /* Results budget (filter: OS) */
                        search.filter === "Orçamentos"
                        ? search.result.map((item: any) => {
                            return (
                              <div key={item.id} className="box-results-cell">
                                <p className="box-results-number">
                                  <b>Número do Orçamento:</b> {item.number}
                                </p>
                                <p className="box-results-name">
                                  <b>Cliente:</b> {item.name}
                                </p>
                                <p className="box-results-options">
                                  <b>Última Atualização:</b> {calendarDate( undefined, undefined, item.dateUpd, "LLL" )} hrs
                                </p>
                              </div>
                            );
                          })
                        : 
                        /* Results Customers (filter: CUST) */
                        search.filter === "Clientes"
                        ? search.result.map((item: any) => {
                            return (
                              <div key={item.id} className="box-results-cell">
                                <p className="box-results-number">
                                  <b>CPF / CNPJ:</b> {item.cpfCnpj}
                                </p>
                                <p className="box-results-name">
                                  <b>Nome / Razão:</b> {item.name}
                                </p>
                                <p className="box-results-options">
                                  <b>Cadastrado em:</b> {calendarDate( undefined, undefined, item.dateAdd, "LLL" )} hrs
                                </p>
                              </div>
                            );
                          })
                        : 
                        /* Results Products (filter: PROD) */
                        search.filter === "Produtos"
                        ? search.result.map((item: any) => {
                            return (
                              <div key={item.id} className="box-results-cell">
                                <p className="box-results-number">
                                  <b>Código do Produto:</b> {item.code}
                                </p>
                                <p className="box-results-name">
                                  <b>Nome:</b> {item.name}
                                </p>
                                <p className="box-results-options">
                                  <b>Última Atualização:</b> {calendarDate( undefined, undefined, item.dateUpd, "LLL" )} hrs
                                </p>
                              </div>
                            );
                          })
                        : 
                        /* Results Users (filter: USER) */
                        search.filter === "Usuários"
                        ? search.result.map((item: any) => {
                            return (
                              <div key={item.id} className="box-results-cell">
                                <p className="box-results-number">
                                  <b>Usuário / Login:</b> {item.userName}
                                </p>
                                <p className="box-results-name">
                                  <b>Nome:</b> {item.name}
                                </p>
                                <p className="box-results-options">
                                  <b>Cadastrado em:</b> {calendarDate( undefined, undefined, item.dateAdd, "LLL" )} hrs
                                </p>
                              </div>
                            );
                          })
                        : ""
                      }
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </SearchContainer>
    )
  );
};
