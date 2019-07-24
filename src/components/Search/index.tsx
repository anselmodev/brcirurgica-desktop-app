import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { History } from "history";
import { Input, InputGroup, Icon, Button } from "rsuite";
import * as _ from "lodash";
import Mousetrap from "mousetrap";
import { SearchContainer } from "./styles";
import { ToolTip } from "../ToolTip";
import { searchAction } from "../../_core/redux/actions";
import { calendarDate } from "../../_core/helpers/dateFormat";

type Props = {
  history: History;
};
export const Search = (props: Props) => {
  const dispatch = useDispatch();
  const search = useSelector((state: any) => state.search.data);
  const inputAutoFocus = useRef<HTMLInputElement>();
  const debounce = useRef(_.debounce(() => handlerSearch(), 1000));

  const handlerSearch = () => {
    const getTerm: any = document.querySelector("#input-search");
    if (getTerm.value.length >= 3) {
      // buscar no banco
      requestDB(getTerm.value);
    } else {
      dispatch(
        searchAction({
          open: true,
          result: []
        })
      );
    }
  };

  // Request to DB
  const requestDB = (term: string) => {
    // const resultDb: object[] = [];
    const resultDb = term
      ? [
          {
            id: 1,
            numberOs: 2862,
            customerName: "PETICULAR WARREN HENDRIX",
            dateUpd: "2019-07-02 00:00:00"
          },
          {
            id: 2,
            numberOs: 2962,
            customerName: "BIOTICA AUSTIN BLAKE",
            dateUpd: "2019-07-02 00:00:00"
          },
          {
            id: 3,
            numberOs: 2923,
            customerName: "AQUASURE GLOVER WALLS",
            dateUpd: "2019-07-02 00:00:00"
          },
          {
            id: 4,
            numberOs: 2860,
            customerName: "MARKETOID LOUISA JENNINGS",
            dateUpd: "2019-07-02 00:00:00"
          }
        ]
      : [];

    if (resultDb.length !== 0) {
      dispatch(
        searchAction({
          open: true,
          result: resultDb
        })
      );
    } else {
      dispatch(
        searchAction({
          open: true,
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
    dispatch(searchAction({ open: true }));
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
                dispatch(searchAction({ open: false, result: [] }))
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
            <InputGroup.Button>
              <ToolTip placement="right" trigger="hover" content="Aplicar Filtro">
                <Icon icon="filter" />
              </ToolTip>
            </InputGroup.Button>
          </InputGroup>

          {!search.result || search.result.length === 0 ? (
            <p className="tips-search">
              Pesquise por: Orçamentos, Clientes Produtos, etc ... <br />
              <small>
                <em>( Mínimo de 3 caracteres )</em>
              </small>
            </p>
          ) : (
            <div className="result-search">
              {/* Results Menu */}
              <div>
                <p className="title-result-search">Resultados:</p>
              </div>

              {/* Results Box */}
              <div className="list-results scroll-style">
                {/* Results Budget */}
                <div id="res-budgets">
                  {search.result.length && search.result[0].noResult ? (
                    <p className="search-noresult">Nenhum resultado com o termo digitado!</p>
                  ) : (
                    search.result.map((item: any) => {
                      return (
                        <div key={item.id} className="box-results-cell">
                          <p className="box-results-number">
                            <b>Número do Orçamento:</b> {item.numberOs}
                          </p>
                          <p className="box-results-name">
                            <b>Cliente:</b> {item.customerName}
                          </p>
                          <p className="box-results-options">
                            <b>Última Atualização:</b>
                            {calendarDate( undefined, undefined, item.dateUpd, "LLL" )} hrs
                          </p>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* Results Customers */}
                {/* 
                    <div id="res-customers">
                    <div className="box-results-cell">
                      <p className="box-results-number">
                        <b>Código do Cliente:</b> 93420
                      </p>
                      <p className="box-results-name">
                        <b>Nome:</b> Nome completo do CLiente Aqui Nome completo do CLiente Aqui
                      </p>
                      <p className="box-results-options">
                        <b>Orçamentos:</b> 432 
                      </p>
                    </div> 
                  </div>
                   */}

                {/* Results Products */}
                {/* 
                    <div id="res-products">
                    <div className="box-results-cell">
                      <p className="box-results-number">
                        <b>Código do Produto:</b> 93420
                      </p>
                      <p className="box-results-name">
                        <b>Nome:</b> Nome completo do CLiente Aqui Nome completo do CLiente Aqui
                      </p>
                      <p className="box-results-options">
                        <b>Valor:</b> R$ 000,00 
                      </p>
                    </div> 
                  </div>
                   */}

                {/* results.data.length > 0
                    ? results.data.map(item => (
                        <p key={item.id}>
                          {item.id} {item.content} ...
                        </p>
                      ))
                    : "Nenhum Resultado Encontrado!" */}
              </div>
            </div>
          )}
        </div>
      </SearchContainer>
    )
  );
};
