import { Pagination } from "@mui/material"

interface IPagination {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  pageNumber: number;
}

const AppPagination = ({ setPage, pageNumber }: IPagination) => {
  const handleChange = (page: number) => {
    setPage(page)
    window.scroll(0, 0)
  }

  return (
    <div>
      <Pagination
        onChange={(e: any) => handleChange(e.target.textContent)}
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
        variant="outlined"
        count={pageNumber}
      />
    </div>
  )
};

export default AppPagination;
