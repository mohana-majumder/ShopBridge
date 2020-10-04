using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ShopBridge.Models
{
    public class Item
    {
        public string ItemId { get; set; }
        public string ItemName { get; set; }
        public string ItemPrice { get; set; }
        public string ItemDescription { get; set; }
        public string ItemImage { get; set; }
    }
}