import React from "react";
import { Icon, Button } from "rsuite";
import { PaginatorContainer, PaginatorContent } from "./styles";

interface PropsPaginator {
  currentPage: number;
  totalPages: number;
  totalResults: number;
}

export const Paginator = (props: PropsPaginator) => {
  return (
    <PaginatorContainer>
      <PaginatorContent orientation="right">
        <em className="paginator-counter">
          Páginas ( {props.currentPage}-{props.totalPages} ):{" "}
        </em>
        <Button size="xs" appearance="subtle">
          <Icon icon="angle-left" size="2x" />{" "}
          <span className="paginator-label">Anterior</span>
        </Button>
        <Button size="xs" appearance="subtle">
          <span className="paginator-label">Próxima</span>{" "}
          <Icon icon="angle-right" size="2x" />
        </Button>
      </PaginatorContent>
    </PaginatorContainer>
  );
};
