using ESHOP.Core;
using ESHOP.Server.Managers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ESHOP.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        ProductManager _productManager;
        public ProductController(EshopContext eshopContext)
        {
            _productManager = new(eshopContext);
        }
        [HttpGet]
        public IActionResult List(int category) {
            return Ok();
        }

    }
}
