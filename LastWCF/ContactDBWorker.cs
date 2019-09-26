using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace LastWCF
{
    /// <summary>
    /// Класс для взаимодействия с базой данных класса Contact
    /// </summary>
    public class ContactDBWorker
    {
        private string _ConnectString;
        private IMylogger _Log;
        public ContactDBWorker(string connectString, IMylogger log)
        {
            this._ConnectString = connectString;
            this._Log = log;
        }

        /// <summary>
        /// Метод создает запись в базе данных (строка подключения в ContactService).
        /// ID назначается автоматически.
        /// Конструктор: Firstname,...,PhoneNumber (строка подключения в ContactService).
        /// </summary>
        /// <param name="person"></param>
        public void Create(Contact person)
        {
            using (SqlConnection cn = new SqlConnection(_ConnectString))
            {
                var insert = "insert into dbo.Person(FirstName,MiddleName,LastName,Inn,BirthdayDate,Gender,PhoneNumber)" +
                    "values(@firstname,@middlename,@lastname,@inn,@birthdaydate,@gender,@phonenumber); " +
                    "SELECT CAST(scope_identity() AS int)";

                SqlCommand sqlCmd = new SqlCommand(insert, cn);
                sqlCmd.CommandTimeout = 3600;
                sqlCmd.CommandType = CommandType.Text;

                //sqlCmd.Parameters.AddWithValue("@id", 1);
                sqlCmd.Parameters.AddWithValue("@firstname", person.FirstName);
                sqlCmd.Parameters.AddWithValue("@middlename", person.MiddleName);
                sqlCmd.Parameters.AddWithValue("@lastname", person.LastName);
                sqlCmd.Parameters.AddWithValue("@inn", person.Inn);
                sqlCmd.Parameters.AddWithValue("@birthdaydate", person.BirthdayDate);
                sqlCmd.Parameters.AddWithValue("@gender", person.Gender);
                sqlCmd.Parameters.AddWithValue("@phonenumber", person.PhoneNumber);

                try
                {
                    cn.Open();
                    //sqlCmd.ExecuteNonQuery();
                    var newID = (int)sqlCmd.ExecuteScalar();
                    _Log.Info("Соединение открыто. Новая запись в таблицу dbo.Person (Contacts db) добавлена успешно");

                }
                catch (SqlException e)
                {
                    _Log.Info("При добавлении новой записи в таблицу dbo.Person (Contacts db) произошла ошибка. Детали: " + e.ToString());
                }
                finally
                {
                    cn.Close();
                    _Log.Info("Попытка добавить одного контакта в базу данных закончена. Соединение закрыто.");
                }


            }
            //return 1;
        }

        /// <summary>
        /// Метод обновляет запись в базе данных
        /// Конструктор: ID,Firstname,..,phone
        /// </summary>
        /// <param name="person"></param>
        public void UpdateContact(Contact person)
        {
            using (SqlConnection cn = new SqlConnection(_ConnectString))
            {
                var update = "update Person" +
                    " set FirstName=@firstname," +
                    "MiddleName=@middlename," +
                    "LastName=@lastname,"+
                    "Inn=@inn," +
                    "BirthdayDate=@birthdaydate," +
                    "Gender=@gender," +
                    "PhoneNumber=@phoneNumber " +
                    "where ID=@id";

                SqlCommand sqlCmd = new SqlCommand(update, cn);
                sqlCmd.Parameters.AddWithValue("@id", person.ID);
                sqlCmd.Parameters.AddWithValue("@firstname", person.FirstName);
                sqlCmd.Parameters.AddWithValue("@middlename", person.MiddleName);
                sqlCmd.Parameters.AddWithValue("@lastname", person.LastName);
                sqlCmd.Parameters.AddWithValue("@inn", person.Inn);
                sqlCmd.Parameters.AddWithValue("@birthdaydate", person.BirthdayDate);
                sqlCmd.Parameters.AddWithValue("@gender", person.Gender);
                sqlCmd.Parameters.AddWithValue("@phonenumber", person.PhoneNumber);

                

                try
                {
                    cn.Open();
                    sqlCmd.ExecuteNonQuery();
                    _Log.Info("Соединение открыто. Запись в таблице Person под id="+person.ID+" успешно обновлена");

                }
                catch (SqlException e)
                {
                    _Log.Info("При обновлении записи в таблице Person (Contacts db) под id="+ person.ID + " произошла ошибка. Детали: " + e.ToString());
                }
                finally
                {
                    cn.Close();
                    _Log.Info("Попытка обновить строку в таблице Person под id="+ person.ID + " закончена. Соединение закрыто.");
                }
            }
        }

        /// <summary>
        /// Метод удаляет запись из базы данных (строка подключения в ContactService).
        /// На вход подается ID записи в БД
        /// </summary>
        /// <param name="id"></param>
        public void DeleteContact(int id)
        {
            using (SqlConnection cn = new SqlConnection(_ConnectString))
            {
                var insert = "delete from Person where id=@id";

                SqlCommand sqlCmd = new SqlCommand(insert, cn);
                sqlCmd.CommandTimeout = 3600;
                sqlCmd.CommandType = CommandType.Text;

                sqlCmd.Parameters.AddWithValue("@id", id);


                try
                {
                    cn.Open();
                    sqlCmd.ExecuteNonQuery();
                    _Log.Info("Соединение открыто. Запись из таблицы dbo.Person (Contacts db) под id="+id+" удалена успешно");

                }
                catch (SqlException e)
                {
                    _Log.Info("При удалении записи из таблицы dbo.Person (Contacts db) под id="+id+" произошла ошибка. Детали: " + e.ToString());
                }
                finally
                {
                    cn.Close();
                    _Log.Info("Попытка удалить запись из таблицы Person по id="+id+" закончена. Соединение закрыто.");
                }


            }

        }

        /// <summary>
        /// Метод для поиска записей в таблице по полю FirstName (строка подключения в ContactService).
        /// Возвращает список типа Contact
        /// </summary>
        /// <param name="firstname"></param>
        /// <returns></returns>
        public List<Contact> GetContactsByFirstName(string firstname)
        {
            List<Contact> toReturnList = GetContactsByField(nameof(Contact.FirstName), firstname);
            return toReturnList;
        }

        /// <summary>
        /// Метод для поиска записей в таблице по полю LastName (строка подключения в ContactService).
        /// Возвращает список типа Contact
        /// </summary>
        /// <param name="firstname"></param>
        /// <returns></returns>
        public List<Contact> GetContactsByLastName(string lastname)
        {
            List<Contact> toReturnList = GetContactsByField(nameof(Contact.LastName), lastname);
            return toReturnList;
        }

        /// <summary>
        /// Вспомогательный метод для GetContactsByLastName и GetContactsByFirstName
        /// Принимает на вход field (столбец в таблице Person) и value (значение этого столбца для поиска всех записей по нему)
        /// Возвращает список типа Contact
        /// </summary>
        /// <param name="field"></param>
        /// <param name="value"></param>
        /// <returns></returns>
        public List<Contact> GetContactsByField(string field,string value)
        {
            List<Contact> toReturnList = new List<Contact>();
            
            using (SqlConnection cn = new SqlConnection(_ConnectString))
            {
                var select = "select ID,FirstName,MiddleName,LastName,Inn,BirthdayDate,Gender,PhoneNumber from Person" +
                    " where "+field+"=@field";


                SqlCommand sqlCmd = new SqlCommand(select, cn);
                sqlCmd.Parameters.AddWithValue("@field", value);


                try
                {
                    cn.Open();
                    _Log.Info("Соединение открыто. Попытка считать запись из таблицы Person по " + field + "=" + value);
                }
                catch (SqlException e)
                {
                    _Log.Info("При попытке открыть соединение с " + _ConnectString + " прозошла ошибка. Детали: " + e.ToString());
                }
                

                SqlDataReader reader = sqlCmd.ExecuteReader();

                while (reader.Read())
                {
                    Contact toReturn = new Contact();
                    try
                    {
                        toReturn.ID = Convert.ToInt32(reader.GetValue(0));
                        toReturn.FirstName = Convert.ToString(reader.GetValue(1));
                        toReturn.MiddleName = Convert.ToString(reader.GetValue(2));
                        toReturn.LastName = Convert.ToString(reader.GetValue(3));
                        toReturn.Inn = Convert.ToInt32(reader.GetValue(4));
                        toReturn.BirthdayDate = Convert.ToString(reader.GetValue(5));
                        toReturn.Gender = Convert.ToString(reader.GetValue(6));
                        toReturn.PhoneNumber = Convert.ToString(reader.GetValue(7));
                        _Log.Info("Считанный по "+field+"=" + value + " контакn был добавлен в переменную типа Contact");
                        toReturnList.Add(toReturn);
                    }
                    catch (SqlException e)
                    {
                        _Log.Info("При попытке считать строку из таблицы по " + field + "=" + value + " произошла ошибка. Детали: " + e.ToString());
                    }
                }
                cn.Close();
                _Log.Info("Попытка считать запись из таблицы Person по " + field + "=" + value + " закончена. Соединение закрыто.");
            }
            return toReturnList;
        }

        /// <summary>
        /// Метод для получения списка всех записей в таблице БД (строка подключения в ContactService).
        /// </summary>
        /// <param name="firstname"></param>
        /// <returns></returns>
        public List<Contact> GetContacts()
        {
            List<Contact> toReturn = new List<Contact>();
            using (SqlConnection cn = new SqlConnection(_ConnectString))
            {
                var select = "select ID,FirstName,MiddleName,LastName,Inn,BirthdayDate,Gender,PhoneNumber from Person";


                SqlCommand sqlCmd = new SqlCommand(select, cn);

                try
                {
                    cn.Open(); 
                    _Log.Info("Соединение открыто. Попытка считать записи из таблицы Person");
                }
                catch (SqlException e)
                {
                    _Log.Info("При попытке открыть соединение с "+_ConnectString+" прозошла ошибка. Детали: " + e.ToString());
                }

                SqlDataReader reader = sqlCmd.ExecuteReader();

                while (reader.Read())
                {
                    try // МОЖНО УБРАТЬ TRY
                    {
                        var test = Convert.ToString(reader.GetValue(4));
                    Contact tmp_person = new Contact(
                        Convert.ToInt32(reader.GetValue(0)), Convert.ToString(reader.GetValue(1)), Convert.ToString(reader.GetValue(2)),
                        Convert.ToString(reader.GetValue(3)), Convert.ToInt32(reader.GetValue(4)),
                        Convert.ToString(reader.GetValue(5)), Convert.ToString(reader.GetValue(6)), Convert.ToString(reader.GetValue(7)));
                        toReturn.Add(tmp_person);
                        _Log.Info("Строку из таблицы была успешно считана, преобразована в экземпляр класса Contact и добавлена в список типа Contact.");
                    }
                    catch(SqlException e)
                    {
                        _Log.Info("При попытке считать строку из таблицы произошла ошибка. Детали: " + e.ToString());

                    }
                    
                }
                cn.Close();
                _Log.Info("Попытка считать все записи из таблицы Person закончена. Соединение закрыто.");
            }
            return toReturn;
        }
    }
}