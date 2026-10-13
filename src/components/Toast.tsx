import { useStore } from "../store/StoreContext";
export function Toast() {
  const { toast, storageAvailable } = useStore();
  return (
    <>
      <div
        className={"toast" + (toast ? " visible" : "")}
        role="status"
        aria-live="polite"
      >
        {toast}
      </div>
      {!storageAvailable && (
        <div className="storageNotice" role="status">
          Seu navegador não permite salvar. Carrinho e favoritos funcionam
          enquanto esta página estiver aberta.
        </div>
      )}
    </>
  );
}
