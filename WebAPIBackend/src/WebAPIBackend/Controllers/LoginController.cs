using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
//using Microsoft.AspNetCore.Authorization;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace WebAPIBackend.Controllers
{
    [Route("api/[controller]")]
    public class LoginController : Controller
    {
        // GET: api/login
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "no", "secret" };
        }

        // GET api/login/5
        [HttpGet("{id}")]
        [Authorize]
        public IEnumerable<string> Get(int id)
        {
            return new string[] { "klaas", " dit is top secret" };
        }

        // POST api/login
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
