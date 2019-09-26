using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LastWCF
{
    public class Log4netUsing : IMylogger
    {
        private static readonly log4net.ILog _Log = log4net.LogManager.GetLogger(System.Reflection.MethodBase.GetCurrentMethod().DeclaringType);

        public void Info(string message)
        {
            _Log.Info(message);
        }
    }
}