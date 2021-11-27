using Data.Models;
using Funtest.TransferObject.Chart.Responses;
using System;

namespace Funtest.Services.Interfaces
{
    public interface IChartService
    {
        ChartResponse GetDataToChart(Product product);
    }
}
