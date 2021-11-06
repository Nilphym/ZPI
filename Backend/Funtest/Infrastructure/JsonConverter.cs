using Newtonsoft.Json.Linq;
using System;

namespace Funtest.Infrastructure
{
    public class JsonConverter
    {
        public JObject ConvertJsonToArray(JObject obj)
        {
            string demo = "{tableName: 'aaa,'" +
                "           rowName1: ''," +
                "           Data1: ['ac', '1', '2', 'b', '3', 'c']," +
                "           RowName2: 'Ble ble'," +
                "           Data2: ['x', 'y', 'z', 't', 'r', 'w']" +
                "}";

            dynamic jsonObject = new JObject();
            //jsonObject.Data = 
            var data = new JObject()
            {
                   { "Date", DateTime.Now },
                   { "Album", "Me Against The World" },
                   { "Year", 1995 },
                   { "Artist", new JObject
                        {
                            { "Name", "2Pac" },
                            { "Age", 28 }
                        }
                   }
            };

            return data;
        }
    }
}
