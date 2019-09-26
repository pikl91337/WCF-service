using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LastWCF
{
    public interface IMylogger
    {
        // log4net.ILog Mylog (); // бессмысленно. методы инфо дебаг еррор фатал итд.

        void Info(string message);
    }
}
