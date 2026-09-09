CREATE EXTENSION IF NOT EXISTS pg_net;

CREATE OR REPLACE FUNCTION trigger_send_waitlist_email()
RETURNS TRIGGER AS $$
BEGIN
  PERFORM net.http_post(
    url := 'https://voxsyvpefyuxacctwngc.supabase.co/functions/v1/send-waitlist-email',
    body := jsonb_build_object(
      'type', 'INSERT',
      'table', TG_TABLE_NAME,
      'schema', TG_TABLE_SCHEMA,
      'record', row_to_json(NEW)
    )
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER send_waitlist_email_trigger
AFTER INSERT ON \"waitlist_applications\"
FOR EACH ROW EXECUTE FUNCTION trigger_send_waitlist_email();

