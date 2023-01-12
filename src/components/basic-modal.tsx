type Props = {
  id: string;
  children: JSX.Element | JSX.Element[];
};

function BasicModal({ id, children }: Props) {
  return (
    <>
      <div className="modal" id={id}>
        <div className="modal-box w-11/12 max-w-2xl">
          <a href="#" className="btn btn-sm btn-circle absolute right-2 top-2">
            ✕
          </a>
          {children}
        </div>
      </div>
    </>
  );
}

export default BasicModal;
