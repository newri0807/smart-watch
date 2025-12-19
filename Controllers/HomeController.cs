using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace SmartWatchApp.Controllers
{
    public class HomeController : Controller
    {
        private readonly IConfiguration _configuration;

        public HomeController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public IActionResult Index()
        {
            // appsettings.json에서 API 키 가져오기
            string apiKey = _configuration["Weather:ApiKey"];

            // View로 키 전달
            ViewData["WeatherApiKey"] = apiKey;

            return View();
        }

        public IActionResult Login()
        {
            return View();
        }

        public IActionResult Editor()
        {
            string apiKey = _configuration["Weather:ApiKey"];
            ViewData["WeatherApiKey"] = apiKey;

            return View();
        }
    }
}