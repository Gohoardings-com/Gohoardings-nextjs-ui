
function Loader() {
  return (
    <div className="loading-container text-center">
      <img src="../images/all_image/loading.gif" className="loading" />
      <style jsx>
        {
          `
       
            .loading {
              height: 200px !important;
              width: auto;
            }
          
          `
        }
      </style>
    </div>
  );
}
 
export default Loader; 