using ShopBridge.Models;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using RestSharp;

namespace ShopBridge.Controllers
{
    public class ItemController : Controller
    {
        // GET: Item
        public ActionResult ItemList()
        {

            return View();
        }
        [HttpPost]
        public ActionResult SaveImage(string imgFile)
        {
            try
            {
                string path = Server.MapPath("~/UploadedFiles");
                bool exists = Directory.Exists(path);
                if (!exists)
                {
                    System.IO.Directory.CreateDirectory(path);
                }

                string DocGuid = Guid.NewGuid().ToString();
                var fileName = DocGuid + ".jpeg";

                string filePath = "";
                // Convert base 64 string to byte[]
                byte[] imageBytes = Convert.FromBase64String(imgFile);
                // Convert byte[] to Image
                using (var ms = new MemoryStream(imageBytes, 0, imageBytes.Length))
                {
                    filePath = Path.Combine(path, fileName);
                    FileStream file = new FileStream(filePath, FileMode.Create, FileAccess.Write);
                    ms.WriteTo(file);
                    file.Close();
                }
                
                return Content(fileName, "text/plain", System.Text.Encoding.UTF8);
                
            }
            catch (Exception ex)
            {
                return Content("Error", "text/plain", System.Text.Encoding.UTF8);
            }
        }

        public ActionResult ItemDetails(int itemId)
        {
            Item objItem = new Item();
            try
            {
                string baseUrl = "http://localhost/ShopBridge_BE";
                string apiUrl = string.Format("/api/Item/GetItemById?ItemId={0}", itemId);

                RestClient client = new RestClient(baseUrl);
                RestRequest req = new RestRequest(apiUrl);
                req.Method = Method.GET;
                RestResponse response = (RestResponse)(client.Get(req));

                if (response.StatusCode == System.Net.HttpStatusCode.OK)
                {
                    objItem = Newtonsoft.Json.JsonConvert.DeserializeObject<Item>(response.Content);                    
                }

            }
            catch (Exception ex)
            {
                objItem = new Item();
            }            

            return View(objItem);
        }
    }
}