const generateContract = () => {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('docid');
    // Assuming you have an HTML structure
    
  
    // Assuming you have a container element to display the contract
    
    return(
        <div>
        <h2>Contract</h2>
        <p>This contract is to confirm that your request to join the platform has been approved by the administrators.</p>
        <p>The platform, represented by El7a2ni site, will take 5% from every deal that you make.</p>
        <p>By accepting this contract, you agree to the terms and conditions outlined above.</p>
        <button type="submit" onClick={() => window.location.href=`/homepagedoctor?docid=${userId}`}>Accept</button>
      </div>
    )
  }
  
 
  export default generateContract;